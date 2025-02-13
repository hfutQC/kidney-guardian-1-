"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import styles from "../styles/AccountManagement.module.css"
import LogoutConfirm from "./LogoutConfirm"

interface AccountManagementProps {
  onClose?: () => void
}

const AccountManagement: React.FC<AccountManagementProps> = ({ onClose }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('showLogoutConfirm changed:', showLogoutConfirm)
  }, [showLogoutConfirm])

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowLogoutConfirm(true)
    console.log('Logout button clicked, showing confirm dialog...')
  }

  const confirmLogout = async () => {
    try {
      await logout()
      setShowLogoutConfirm(false)
      if (onClose) onClose()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
    if (onClose) onClose()
  }

  return (
    <>
      <div 
        className={styles.accountManagement} 
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <button onClick={() => router.push("/profile")} className={styles.option}>
          账号信息
        </button>
        <button onClick={handleLogout} className={styles.option}>
          退出
        </button>
      </div>
      {showLogoutConfirm && <LogoutConfirm onConfirm={confirmLogout} onCancel={cancelLogout} />}
    </>
  )
}

export default AccountManagement

