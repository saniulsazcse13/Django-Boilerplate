import { create } from "zustand"
import type { UserProfile } from "@/types"

interface AuthState {
  accessToken: string | null
  user: UserProfile | null
  isAuthenticated: boolean
  setAuth: (access: string, user: UserProfile) => void
  setAccessToken: (access: string) => void
  setUser: (user: UserProfile) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAuth: (access, user) =>
    set({
      accessToken: access,
      user,
      isAuthenticated: true,
    }),

  setAccessToken: (access) =>
    set({ accessToken: access }),

  setUser: (user) =>
    set({ user }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    }),
}))
