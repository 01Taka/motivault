import type { PomodoroProgressSessionRead } from '../services/documents/pomodoro-progress-session-document'

/**
 * @typedef {object} PomodoroSessionSummary
 * @property {number} totalStudyDuration - セッションの合計勉強時間 (ミリ秒)。
 * @property {number} totalBreakDuration - セッションの合計休憩時間 (ミリ秒)。
 * @property {number} totalCycles - セッション内の完了したサイクルの総数。
 */
export type PomodoroSessionSummary = {
  totalStudyDuration: number
  totalBreakDuration: number
  totalCycles: number
}

/**
 * ポモドーロセッションの進捗データから合計勉強時間、合計休憩時間、サイクル数を算出します。
 * 完了したサイクルのみを計算に含め、現在進行中のサイクルは含みません。
 *
 * @param {PomodoroProgressSessionRead} session - 計算対象のポモドーロセッションデータ。
 * @returns {PomodoroSessionSummary} セッションの要約情報を含むオブジェクト。
 */
export const calculatePomodoroSessionSummary = (
  session: PomodoroProgressSessionRead
): PomodoroSessionSummary => {
  let totalStudyDuration = 0
  let totalBreakDuration = 0
  let totalCycles = 0

  session.cycles.forEach((cycle) => {
    // endAtがnullでない（サイクルが完了している）場合のみ計算に含める
    if (cycle.endAt !== null) {
      const duration = cycle.endAt - cycle.startAt

      if (cycle.type === 'study') {
        totalStudyDuration += duration
      } else if (cycle.type === 'break') {
        totalBreakDuration += duration
      }
      totalCycles++ // 完了したサイクルのみをカウント
    }
  })

  return {
    totalStudyDuration,
    totalBreakDuration,
    totalCycles: Math.floor(totalCycles / 2),
  }
}
