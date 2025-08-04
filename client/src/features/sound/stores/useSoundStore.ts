import { create } from 'zustand'
import type { SoundSequenceItem, SoundState } from '../types/sound-types'

export const useSoundStore = create<SoundState>((set, get) => ({
  isGloballyInitialized: false,
  isPermissionDenied: false,
  hasPendingSounds: false,
  audioMap: {},
  pendingSounds: {},
  sequenceIntervalId: null,

  addPendingSound: (key, path) => {
    set((state) => {
      if (state.audioMap[key] || state.pendingSounds[key]) {
        return state
      }
      return {
        pendingSounds: { ...state.pendingSounds, [key]: path },
        hasPendingSounds: true,
      }
    })
  },

  initializeAllSounds: async () => {
    const { pendingSounds } = get()
    if (Object.keys(pendingSounds).length === 0) {
      set({ hasPendingSounds: false })
      return
    }

    const newAudioMap: { [key: string]: HTMLAudioElement } = {}
    Object.keys(pendingSounds).forEach((key) => {
      const audio = new Audio(pendingSounds[key])
      audio.load()
      newAudioMap[key] = audio
    })

    const firstAudio = Object.values(newAudioMap)[0]
    if (firstAudio) {
      firstAudio.volume = 0
      try {
        await firstAudio.play()
        firstAudio.pause()
        firstAudio.volume = 1
        set((state) => ({
          isGloballyInitialized: true,
          isPermissionDenied: false,
          hasPendingSounds: false,
          audioMap: { ...state.audioMap, ...newAudioMap },
          pendingSounds: {},
        }))
      } catch (error) {
        console.error('音声の初期化に失敗しました:', error)
        // ユーザーが拒否した場合や、再生できない場合
        set({ hasPendingSounds: false, isPermissionDenied: true })
      }
    } else {
      set({ hasPendingSounds: false })
    }
  },

  playSound: (key: string) => {
    const audio = get().audioMap[key]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch((error) => {
        console.error(`音声ファイル '${key}' の再生に失敗しました:`, error)
      })
    } else {
      console.warn(`キー '${key}' の音声は初期化されていません。`)
    }
  },

  setPermissionDenied: (denied) => {
    set({ isPermissionDenied: denied })
  },

  // 1. 指定した音をリピート再生する関数
  playLoop: (key: string, count: number, interval: number = 0) => {
    const { playSound, isGloballyInitialized, isPermissionDenied } = get()
    if (!isGloballyInitialized || isPermissionDenied) {
      console.warn('音声再生が許可されていないか、初期化されていません。')
      return
    }

    if (count === 0) {
      return
    }

    playSound(key)
    let repeatCount = 1
    const intervalId = window.setInterval(() => {
      if (repeatCount >= count) {
        window.clearInterval(intervalId)
        return
      }
      playSound(key)
      repeatCount++
    }, interval)
  },

  // 2. 配列で渡された音を順番に再生する関数
  // storeに追加するヘルパー関数

  // playSequenceの新しい実装
  playSequence: async (sequence: SoundSequenceItem[]) => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    const { playSound, isGloballyInitialized, isPermissionDenied } = get()
    if (!isGloballyInitialized || isPermissionDenied) {
      console.warn('音声再生が許可されていないか、初期化されていません。')
      return
    }

    for (const item of sequence) {
      const { key, repeat = 1, interval = 1000 } = item

      for (let i = 0; i < repeat; i++) {
        playSound(key)
        if (i < repeat) {
          await delay(interval)
        }
      }
    }
  },
}))
