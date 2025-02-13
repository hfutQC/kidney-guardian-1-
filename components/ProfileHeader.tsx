"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/ProfileHeader.module.css"
import AccountManagement from "./AccountManagement"

const ProfileHeader: React.FC = () => {
  const { user } = useAuth()
  const [showAccountManagement, setShowAccountManagement] = useState(false)

  const toggleAccountManagement = () => {
    setShowAccountManagement(!showAccountManagement)
  }

  if (!user) return null

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/104629ecba5539d78b57522618353fc0-ZwrWdJHsi0lgt6iHovefuNaJagD5iV.png"
            alt="肾卫士"
            width={120}
            height={40}
            className={styles.logoImage}
          />
        </Link>
        <div className={styles.accountSection}>
          <div className={styles.userInfo}>
            <span className={styles.username}>{user.username}</span>
            <div className={styles.avatarContainer} onClick={toggleAccountManagement}>
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                width={40}
                height={40}
                className={styles.avatar}
              />
              {showAccountManagement && <AccountManagement onClose={() => setShowAccountManagement(false)} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader

