import { useCallback } from 'react'
import { useSoundStore } from '../stores/useSoundStore'
import type { SoundSequenceItem } from '../types/sound-types'

type SoundMap = { [key: string]: string }

/**
 * カスタムフック: 音声の再生を管理するための機能を提供します。
 * useCallbackを使い、不要な関数の再生成を防ぎます。
 *
 * @returns {object}
 * - play: 初期化済みの音声を再生する関数。
 * - playOnUserGesture: ユーザーイベントで音声を即座に再生し、同時に初期化する関数。
 * - registerSound: 音声ファイルを初期化待ちリストに登録する関数。
 * - playLoop: 音声をリピート再生する関数。
 * - playSequence: 音声をシーケンスで再生する関数。
 * - isGloballyInitialized: アプリ全体の音声が初期化済みかどうかの状態。
 */
export const useSoundPlayer = () => {
  const addPendingSoundFromStore = useSoundStore(
    (state) => state.addPendingSound
  )
  const initializeAllSoundsFromStore = useSoundStore(
    (state) => state.initializeAllSounds
  )
  const playSoundFromStore = useSoundStore((state) => state.playSound)
  const playLoopFromStore = useSoundStore((state) => state.playLoop)
  const playSequenceFromStore = useSoundStore((state) => state.playSequence)

  const isGloballyInitialized = useSoundStore(
    (state) => state.isGloballyInitialized
  )
  const isPermissionDenied = useSoundStore((state) => state.isPermissionDenied)
  const audioMap = useSoundStore((state) => state.audioMap)
  const pendingSounds = useSoundStore((state) => state.pendingSounds)

  // registerSoundをメモ化
  const registerSound = useCallback(
    (sounds: SoundMap) => {
      Object.entries(sounds).forEach(([key, path]) => {
        if (!audioMap[key] && !pendingSounds[key]) {
          addPendingSoundFromStore(key, path)
        }
      })
    },
    [addPendingSoundFromStore, audioMap, pendingSounds]
  )

  // playOnUserGestureをメモ化
  const playOnUserGesture = useCallback(
    async (key: string, path: string) => {
      if (isPermissionDenied) {
        console.warn('音声再生は拒否されています。')
        return
      }

      if (audioMap[key]) {
        playSoundFromStore(key)
        return
      }

      addPendingSoundFromStore(key, path)
      await initializeAllSoundsFromStore()
      playSoundFromStore(key)
    },
    [
      isPermissionDenied,
      audioMap,
      playSoundFromStore,
      addPendingSoundFromStore,
      initializeAllSoundsFromStore,
    ]
  )

  // playをメモ化
  const play = useCallback(
    (key: string) => {
      if (!isGloballyInitialized) {
        console.warn('音声を再生する前に、アプリ全体の初期化が必要です。')
        return
      }
      if (isPermissionDenied) {
        console.warn('音声再生は拒否されています。')
        return
      }
      playSoundFromStore(key)
    },
    [isGloballyInitialized, isPermissionDenied, playSoundFromStore]
  )

  // playLoopをメモ化
  const playLoop = useCallback(
    (key: string, count: number, interval?: number) => {
      if (!isGloballyInitialized || isPermissionDenied) {
        console.warn('音声再生が許可されていないか、初期化されていません。')
        return
      }
      playLoopFromStore(key, count, interval)
    },
    [isGloballyInitialized, isPermissionDenied, playLoopFromStore]
  )

  // playSequenceをメモ化
  const playSequence = useCallback(
    (sequence: SoundSequenceItem[]) => {
      if (!isGloballyInitialized || isPermissionDenied) {
        console.warn('音声再生が許可されていないか、初期化されていません。')
        return
      }
      playSequenceFromStore(sequence)
    },
    [isGloballyInitialized, isPermissionDenied, playSequenceFromStore]
  )

  return {
    play,
    playOnUserGesture,
    registerSound,
    playLoop,
    playSequence,
    isGloballyInitialized,
  }
}
