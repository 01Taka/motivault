// stores/useUserStore.ts
import { create } from 'zustand'
interface UserRead {}

interface CurrentUserStore {
  uid: string | null
  user: UserRead | null
  loading: boolean
  error: Error | null
  setUid: (uid: string | null) => void
  setUser: (user: UserRead | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
}

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  uid: null,
  user: null,
  loading: true,
  error: null,
  setUid: (uid) => set({ uid }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))

// |DEL|
