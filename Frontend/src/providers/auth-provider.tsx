"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuthStore } from "@/store/auth-store"
import { getProfile } from "@/lib/auth"

interface AuthContextType {
  isLoading: boolean
  isAuthenticated: boolean
  user: ReturnType<typeof useAuthStore.getState>["user"]
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, user, setUser } = useAuthStore()

  const refreshUser = async () => {
    try {
      const profile = await getProfile()
      setUser(profile)
    } catch {
      useAuthStore.getState().logout()
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      refreshUser().finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
