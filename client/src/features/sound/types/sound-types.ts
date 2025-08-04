export type SoundMap = { [key: string]: string }

export type SoundSequenceItem = {
  key: string
  interval?: number
  repeat?: number
}

export interface SoundState {
  isGloballyInitialized: boolean
  isPermissionDenied: boolean
  hasPendingSounds: boolean
  audioMap: { [key: string]: HTMLAudioElement }
  pendingSounds: SoundMap

  sequenceIntervalId: number | null

  addPendingSound: (key: string, path: string) => void
  initializeAllSounds: () => Promise<void>
  playSound: (key: string) => void
  setPermissionDenied: (denied: boolean) => void
  playLoop: (key: string, count: number, interval?: number) => void
  playSequence: (sequence: SoundSequenceItem[]) => void
}
