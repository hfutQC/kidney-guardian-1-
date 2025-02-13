import { testUsers } from "../data/testUsers"

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: any
  error?: string
}

export async function authenticate(credentials: LoginCredentials): Promise<AuthResponse> {
  const user = testUsers.find((u) => u.username === credentials.username && u.password === credentials.password)

  if (!user) {
    return {
      success: false,
      error: "用户名或密码错误",
    }
  }

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      medicalHistory: user.medicalHistory,
      personalInfo: user.personalInfo,
      medicalRecords: user.medicalRecords,
    },
  }
}

export async function logout(): Promise<{ success: boolean }> {
  // In a real application, this would handle server-side logout logic
  return { success: true }
}

