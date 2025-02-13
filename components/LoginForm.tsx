"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import styles from "../styles/LoginForm.module.css"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ username, password })
      router.push("/")
    } catch (err) {
      console.error("Login failed:", err)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2>登录</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">用户名</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">密码</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "登录中..." : "登录"}
        </button>
      </form>
    </div>
  )
}

export default LoginForm

