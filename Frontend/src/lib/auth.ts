import api from "./api"
import axios from "axios"
import { useAuthStore } from "@/store/auth-store"
import type { AuthResponse, UserProfile } from "@/types"

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/google/", {
    id_token: idToken,
  })
  const data = response.data
  useAuthStore.getState().setAuth(data.access, data.user)
  return data
}

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>("/user/profile/")
  return response.data
}

export async function silentRefresh(): Promise<string | null> {
  try {
    const response = await axios.post<{ access: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
      {},
      { withCredentials: true }
    )
    const { access } = response.data
    useAuthStore.getState().setAccessToken(access)
    return access
  } catch {
    useAuthStore.getState().logout()
    return null
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout/")
  } finally {
    useAuthStore.getState().logout()
  }
}
