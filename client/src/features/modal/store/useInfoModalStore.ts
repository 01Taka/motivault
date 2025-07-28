import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type {
  FullModalInfo,
  InfoModalStore,
} from '../types/info-modal-store-types'

export const useInfoModalStore = create<InfoModalStore>()(
  persist(
    (set) => ({
      infoQueue: [],

      addInfo: (modalInfo) =>
        set((state) => ({
          infoQueue: [
            ...state.infoQueue,
            { ...modalInfo, timestamp: Date.now() } as FullModalInfo, // 現在の UNIX タイムスタンプを追加
          ],
        })),

      removeInfo: () =>
        set((state) => ({
          infoQueue: state.infoQueue.slice(1),
        })),

      clearQueue: () =>
        set(() => ({
          infoQueue: [],
        })),
    }),
    {
      name: 'info-modal-storage', // localStorage に保存されるキーの名前
      storage: createJSONStorage(() => localStorage), // localStorage を使用
    }
  )
)
