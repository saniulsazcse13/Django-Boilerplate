import api from "./api"
import { useAuthStore } from "@/store/auth-store"
import type { AuthResponse, UserProfile } from "@/types"

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/google/", {
    id_token: idToken,
  })
  const data = response.data
  useAuthStore.getState().setAuth(data.access, data.refresh, data.user)
  return data
}

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>("/user/profile/")
  return response.data
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await api.post<{ access: string }>("/token/refresh/", {
    refresh: refreshToken,
  })
  return response.data.access
}

export async function logout(refreshToken: string): Promise<void> {
  try {
    await api.post("/auth/logout/", { refresh: refreshToken })
  } finally {
    useAuthStore.getState().logout()
  }
}
