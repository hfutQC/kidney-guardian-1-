"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

interface User {
  id: number
  username: string
  avatar: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "登录失败")
      }

      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      if (!response.ok) {
        throw new Error("退出失败")
      }

      setUser(null)
      localStorage.removeItem("user")
    } catch (err) {
      setError(err instanceof Error ? err.message : "退出失败")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, error, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

