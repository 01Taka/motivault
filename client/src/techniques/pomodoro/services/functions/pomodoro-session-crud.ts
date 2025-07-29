import { toISODate } from '../../../../functions/dateTime-utils/time-conversion'
import type { DBWriteTarget } from '../../../../types/db/db-service-interface'
import type { UnixTimestamp } from '../../../../types/utils/datetime-types'
import type {
  PomodoroProgressCycle,
  PomodoroProgressSessionRead,
  PomodoroProgressSessionWrite,
} from '../documents/pomodoro-progress-session-document'
import type { PomodoroSessionWrite } from '../documents/pomodoro-session-document'
import type {
  PomodoroCycle,
  PomodoroCycleType,
} from '../documents/pomodoro-session-shared-data'
import type { PomodoroProgressSessionIDBRepository } from '../repositories/indexedDB/pomodoro-progress-session-idb-repository'
import type { PomodoroSessionRepository } from '../repositories/repositories'

// =============================================================================
// Types and Interfaces
// =============================================================================

export type AutoStartControl =
  | { isActive: false }
  | {
      isActive: true
      initialCycleType: PomodoroCycleType
    }

// =============================================================================
// Error Classes
// =============================================================================

class PomodoroServiceError extends Error {
  public readonly cause?: Error

  constructor(message: string, cause?: Error) {
    super(message)
    this.name = 'PomodoroServiceError'
    this.cause = cause
  }
}

// =============================================================================
// Validation Utilities
// =============================================================================

const validateSessionForSaving = (
  session: PomodoroProgressSessionWrite | null
): PomodoroProgressSessionWrite => {
  if (!session) {
    throw new PomodoroServiceError(
      'セッションの保存に失敗しました: 進行中のセッションデータがローカルに見つかりません。'
    )
  }
  return session
}

const validateSessionState = (session: PomodoroProgressSessionWrite) => {
  if (session.state !== 'finished' && session.state !== 'saved') {
    throw new PomodoroServiceError(
      `予期しないセッション状態です (${session.state})。保存できません。`
    )
  }

  if (session.state === 'saved') {
    console.warn(
      '保存しようとしたセッションは、既に永続ストレージに「保存済み」としてマークされています。二重保存は行いません。'
    )
    return false // Skip saving
  }

  return true // Can save
}

const validateActiveSession = (
  session: PomodoroProgressSessionWrite | null
): PomodoroProgressSessionWrite => {
  if (!session) {
    throw new PomodoroServiceError(
      'サイクルを変更できません: 進行中のセッションが見つかりません。先にセッションを開始してください。'
    )
  }

  if (
    session.state === 'finished' ||
    session.endAt !== null ||
    !session.progressCycle
  ) {
    throw new PomodoroServiceError(
      'サイクルを変更できません: セッションが既に終了しているか、進行中のサイクルがありません。'
    )
  }

  return session
}

// =============================================================================
// Core Business Logic
// =============================================================================

/**
 * 進行中のサイクルを完了させ、新しいサイクルを開始するために既存のサイクル配列にマージします。
 * @param cycles 既存の完了済みサイクル配列
 * @param progressCycle 進行中のサイクル
 * @param timestamp 進行中のサイクルが完了したと見なすタイムスタンプ
 * @returns 完了したサイクルが追加された新しいサイクル配列
 */
const mergeCycleInProgress = (
  cycles: PomodoroCycle[],
  progressCycle: PomodoroProgressCycle,
  timestamp: UnixTimestamp
): PomodoroCycle[] => {
  const finishedCycle: PomodoroCycle = {
    ...progressCycle,
    endAt: timestamp,
  } as PomodoroCycle

  return [...cycles, finishedCycle]
}

/**
 * PomodoroProgressSessionWrite から PomodoroSessionWrite への変換
 */
const convertToSessionWrite = (
  progressSession: PomodoroProgressSessionWrite
): PomodoroSessionWrite => {
  if (!progressSession.endAt) {
    throw new PomodoroServiceError(
      'セッションの変換に失敗しました: endAtが設定されていません。'
    )
  }

  return {
    startAt: progressSession.startAt,
    endAt: progressSession.endAt,
    date: progressSession.date,
    cycles: progressSession.cycles,
  }
}

/**
 * 進行中のセッションを自動完了する
 */
const autoCompleteSession = async (
  progressSessionRepo: PomodoroProgressSessionIDBRepository,
  timestamp: UnixTimestamp
): Promise<PomodoroProgressSessionWrite> => {
  console.log('進行中のセッションを自動的に完了させてから保存を試みます。')

  await finishPomodoroProgressSessionInLocal(progressSessionRepo, timestamp)

  const updatedSession = await progressSessionRepo.read([])
  if (!updatedSession || updatedSession.state !== 'finished') {
    throw new PomodoroServiceError(
      'セッションの自動完了に失敗しました。データを永続保存できません。'
    )
  }

  return updatedSession
}

// =============================================================================
// Cycle Management
// =============================================================================

/**
 * 新しいポモドーロセッションと最初のサイクルを開始する
 */
const startNewPomodoroSessionAndCycle = async (
  sessionRepo: PomodoroProgressSessionIDBRepository,
  subjectId: string | null,
  cycleType: PomodoroCycleType,
  timestamp: UnixTimestamp
): Promise<DBWriteTarget> => {
  if (subjectId === null) {
    throw new PomodoroServiceError(
      'セッションを新規開始するには、勉強サイクルから始めるため subjectId が必須です。'
    )
  }

  console.log(
    'セッションが開始されていないため、新しいセッションを開始します。'
  )

  return await startPomodoroSessionAndCycleInLocal(
    sessionRepo,
    subjectId,
    timestamp,
    cycleType
  )
}

/**
 * 既存のセッション内で次のポモドーロサイクルへの移行を処理する
 */
const transitionPomodoroCycle = (
  currentProgressCycle: PomodoroProgressCycle,
  subjectId: string | null,
  timestamp: UnixTimestamp
): PomodoroProgressCycle => {
  if (currentProgressCycle.type === 'break') {
    if (subjectId === null) {
      throw new PomodoroServiceError(
        '休憩から勉強サイクルを開始するには subjectId が必須です。'
      )
    }

    return {
      type: 'study',
      startAt: timestamp,
      endAt: null,
      subjectId,
    }
  }

  return {
    type: 'break',
    startAt: timestamp,
    endAt: null,
  }
}

// =============================================================================
// Public API Functions
// =============================================================================
/**
 * 進行中のセッションを完了し、永続ストレージに保存します。
 * この関数は、ローカル (IndexedDB) からセッションデータをフェッチし、
 * 必要に応じてセッションを自動完了させてから、永続ストレージ (Firestore) に書き込みます。
 *
 * @param sessionRepo 永続セッションのリポジトリ (Firestoreなど)
 * @param progressSessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)
 * @param autoSave trueの場合、進行中のセッションを自動で完了させます。falseの場合、セッションが進行中であればエラーをスローします。
 * @param timestamp 操作時のUnixタイムスタンプ
 * @returns 保存結果
 * @throws {PomodoroServiceError} 進行中のセッションデータが見つからない、セッションが進行中だがautoSaveがfalse、自動完了に失敗、または保存に失敗した場合
 */
export const savePomodoroProgressSession = async (
  sessionRepo: PomodoroSessionRepository,
  progressSessionRepo: PomodoroProgressSessionIDBRepository,
  autoSave: boolean = true,
  timestamp: UnixTimestamp = Date.now()
) => {
  try {
    let progressSession = validateSessionForSaving(
      await progressSessionRepo.read([])
    )

    // セッションがまだ進捗中であれば、autoSaveの設定に応じて完了させる
    if (progressSession.state === 'progress') {
      if (autoSave) {
        progressSession = await autoCompleteSession(
          progressSessionRepo,
          timestamp
        )
      } else {
        throw new PomodoroServiceError(
          'セッションはまだ進行中です。保存するには、先にセッションを完了させるか、autoSaveをtrueに設定してください。'
        )
      }
    }

    if (!validateSessionState(progressSession)) {
      return // Already saved, skip
    }

    const sessionToSave = convertToSessionWrite(progressSession)
    const result = await sessionRepo.create(sessionToSave)

    await progressSessionRepo.update({ state: 'saved' }, [])
    console.log('セッションが正常に永続保存されました。')

    return result
  } catch (error) {
    console.error('セッションの永続保存中にエラーが発生しました:', error)

    if (error instanceof PomodoroServiceError) {
      throw error
    }

    throw new PomodoroServiceError(
      `セッションの保存に失敗しました。詳細: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * ローカルで新しいセッションと最初のサイクルを開始します。
 * 既存のセッションが進行中の場合はエラーをスローします。
 * @param sessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)
 * @param subjectId 現在の勉強サイクルの教科ID
 * @param timestamp 開始時のUnixタイムスタンプ
 * @param type 最初のサイクルのタイプ ('study' or 'break')
 * @returns 作成された進捗セッション
 * @throws {PomodoroServiceError} 既存のセッションが進行中の場合、またはセッションの作成に失敗した場合
 */
export const startPomodoroSessionAndCycleInLocal = async (
  sessionRepo: PomodoroProgressSessionIDBRepository,
  subjectId: string,
  timestamp: UnixTimestamp = Date.now(),
  type: PomodoroCycleType = 'study'
): Promise<DBWriteTarget> => {
  try {
    const existingSession = await sessionRepo.read([])

    if (existingSession !== null && existingSession.state !== 'saved') {
      throw new PomodoroServiceError(
        '新しいセッションを開始できません: 既存のセッションが保存されていません。先に現在のセッションを終了・保存してください。'
      )
    }

    const progressCycle: PomodoroProgressCycle =
      type === 'study'
        ? {
            type: 'study',
            startAt: timestamp,
            endAt: null,
            subjectId,
          }
        : {
            type: 'break',
            startAt: timestamp,
            endAt: null,
          }

    const newSession: PomodoroProgressSessionWrite = {
      state: 'progress',
      startAt: timestamp,
      endAt: null,
      date: toISODate(timestamp),
      progressCycle,
      cycles: [],
    }

    return await sessionRepo.create(newSession, [])
  } catch (error) {
    console.error(
      'ローカルでのセッションとサイクルの開始中にエラーが発生しました:',
      error
    )

    if (error instanceof PomodoroServiceError) {
      throw error
    }

    throw new PomodoroServiceError(
      `ローカルセッションの開始に失敗しました。詳細: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * ローカルで進行中のサイクルを終了させ、新しいサイクルを開始します。
 * @param sessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)
 * @param newProgressCycle 次に開始する新しい進行中のサイクル
 * @param timestamp 操作時のUnixタイムスタンプ
 * @throws {PomodoroServiceError} セッションが見つからない、または既に終了している場合
 */
export const changePomodoroProgressCycleInLocal = async (
  sessionRepo: PomodoroProgressSessionIDBRepository,
  newProgressCycle: PomodoroProgressCycle,
  timestamp: UnixTimestamp = Date.now()
): Promise<void> => {
  try {
    const session = validateActiveSession(await sessionRepo.read([]))

    const updatedCycles = mergeCycleInProgress(
      session.cycles,
      session.progressCycle!, // validateActiveSessionで検証済み
      timestamp
    )

    await sessionRepo.update(
      { cycles: updatedCycles, progressCycle: newProgressCycle },
      []
    )

    console.log('ローカルの進捗サイクルが正常に変更されました。')
  } catch (error) {
    console.error(
      'ローカルでの進捗サイクルの変更中にエラーが発生しました:',
      error
    )

    if (error instanceof PomodoroServiceError) {
      throw error
    }

    throw new PomodoroServiceError(
      `ローカルでのサイクル変更に失敗しました。詳細: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * ローカルで進行中のセッション全体を終了させます。
 * @param sessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)
 * @param timestamp セッションが終了したと見なすUnixタイムスタンプ
 * @throws {PomodoroServiceError} セッションが見つからない、または既に終了している場合
 */
export const finishPomodoroProgressSessionInLocal = async (
  sessionRepo: PomodoroProgressSessionIDBRepository,
  timestamp: UnixTimestamp = Date.now()
): Promise<void> => {
  try {
    const session = await sessionRepo.read([])

    if (!session) {
      console.warn(
        'ローカルセッションを終了できませんでした: 進行中のセッションが見つかりません。'
      )
      return
    }

    if (session.state === 'finished' || session.endAt !== null) {
      console.warn(
        'ローカルセッションを終了できませんでした: セッションは既に「終了済み」としてマークされています。'
      )
      return
    }

    if (!session.progressCycle) {
      throw new PomodoroServiceError(
        'ローカルセッションを終了できません: 進行中のサイクルが存在しません。データが不整合です。'
      )
    }

    const updatedCycles = mergeCycleInProgress(
      session.cycles,
      session.progressCycle,
      timestamp
    )

    await sessionRepo.update(
      {
        cycles: updatedCycles,
        progressCycle: null,
        endAt: timestamp,
        state: 'finished',
      },
      []
    )

    console.log('ローカルセッションが正常に終了しました。')
  } catch (error) {
    console.error(
      'ローカルでのセッションの終了中にエラーが発生しました:',
      error
    )

    if (error instanceof PomodoroServiceError) {
      throw error
    }

    throw new PomodoroServiceError(
      `ローカルセッションの終了に失敗しました。詳細: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * ローカルのポモドーロサイクル（勉強⇔休憩）を切り替える主要な関数。
 * セッションが開始されていない場合や、進行中のサイクルがない場合はエラーをスローします。
 * 明示的に初期化されるという設計思想に基づきます。
 *
 * @param sessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)。
 * @param subjectId 勉強サイクルを開始する場合の教科ID。休憩サイクルへ切り替える場合は不要 (null可)。
 * @param timestamp 操作時のUnixタイムスタンプ (ミリ秒)。デフォルトは `Date.now()`。
 * @returns {Promise<DBWriteTarget | void>} DB書き込みターゲット、またはvoid。
 * @throws {PomodoroServiceError} セッションや進行中のサイクルが見つからない場合、または無効な状態遷移の場合。
 */
export const togglePomodoroCycleInLocal = async (
  sessionRepo: PomodoroProgressSessionIDBRepository,
  subjectId: string | null,
  timestamp: UnixTimestamp = Date.now()
): Promise<DBWriteTarget | void> => {
  try {
    const currentSession = await sessionRepo.read([])

    // セッションがまだ開始されていない、または進行中でない場合はエラーをスロー
    if (!currentSession || currentSession.state !== 'progress') {
      throw new PomodoroServiceError(
        'サイクルを切り替えできません: アクティブなポモドーロセッションが存在しません。セッションを明示的に開始してください。'
      )
    }

    // 進行中のサイクルがない場合はエラーをスロー
    if (!currentSession.progressCycle) {
      throw new PomodoroServiceError(
        'サイクルを切り替えできません: 現在、進行中のサイクルがありません。新しいサイクルを開始してください。'
      )
    }

    // 進行中のサイクルが存在し、状態を切り替える
    const newProgressCycle = transitionPomodoroCycle(
      currentSession.progressCycle,
      subjectId, // 休憩から勉強への切り替え時にsubjectIdが必要になる
      timestamp
    )

    return await changePomodoroProgressCycleInLocal(
      sessionRepo,
      newProgressCycle,
      timestamp
    )
  } catch (error) {
    console.error(
      'ポモドーロサイクルの切り替え中にエラーが発生しました:',
      error
    )

    if (error instanceof PomodoroServiceError) {
      throw error
    }

    throw new PomodoroServiceError(
      `ポモドーロサイクルの切り替えに失敗しました。詳細: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * ポモドーロセッションを初期化する関数。
 * 既存のセッションの状態に応じて、新しいセッションを開始するか、既存のセッションを返します。
 *
 * @param sessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)。
 * @param initialSubjectId 新しいセッションを開始する場合の最初の勉強サイクルの教科ID。
 * @param initialCycleType 新しいセッションを開始する場合の最初のサイクルの種類 ('study' または 'break')。
 * @param timestamp 操作時のUnixタイムスタンプ (ミリ秒)。デフォルトは `Date.now()`。
 * @returns {Promise<PomodoroProgressSessionRead | DBWriteTarget>} 既存の進行中セッション、
 * または新しく開始されたセッションの書き込みターゲット。
 * @throws {PomodoroServiceError} 初期化中にエラーが発生した場合。
 */
export const initializePomodoroSession = async (
  sessionRepo: PomodoroProgressSessionIDBRepository,
  initialSubjectId: string | null,
  initialCycleType: PomodoroCycleType = 'study', // デフォルトで 'study' を設定
  timestamp: UnixTimestamp = Date.now()
): Promise<PomodoroProgressSessionRead | DBWriteTarget> => {
  try {
    const currentSession = await sessionRepo.read([])

    if (currentSession && currentSession.state === 'progress') {
      console.log('既存の進行中セッションを継続します。')
      return currentSession
    }

    // セッションが存在しない、または 'saved' 状態の場合、新しいセッションを開始
    console.log('新しいポモドーロセッションを開始します。')
    return await startNewPomodoroSessionAndCycle(
      sessionRepo,
      initialSubjectId,
      initialCycleType,
      timestamp
    )
  } catch (error) {
    console.error(
      'ポモドーロセッションの初期化中にエラーが発生しました:',
      error
    )

    if (error instanceof PomodoroServiceError) {
      throw error
    }

    throw new PomodoroServiceError(
      `ポモドーロセッションの初期化に失敗しました。詳細: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * 現在の進行中セッションを取得します。
 * @param sessionRepo 進行中セッションのローカルリポジトリ (IndexedDB)
 * @returns 現在の進行中セッション、または null
 */
export const getCurrentPomodoroProgressSessionInLocal = async (
  sessionRepo: PomodoroProgressSessionIDBRepository
): Promise<PomodoroProgressSessionWrite | null> => {
  return await sessionRepo.read([])
}
