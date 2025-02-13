"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import styles from "../styles/AuthModal.module.css"

interface AuthModalProps {
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login({ username, password })
      onClose()
    } catch (err) {
      console.error("Login failed:", err)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{isLogin ? "登录" : "注册"}</h2>
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
            {isLoading ? "登录中..." : isLogin ? "登录" : "注册"}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton} disabled={isLoading}>
          切换到{isLogin ? "注册" : "登录"}
        </button>
        <button onClick={onClose} className={styles.closeButton} disabled={isLoading}>
          关闭
        </button>
      </div>
    </div>
  )
}

export default AuthModal

