"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Header.module.css"
import AccountManagement from "./AccountManagement"
import type React from "react" // Added import for React

const Header: React.FC = () => {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAccountManagement, setShowAccountManagement] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const toggleAccountManagement = () => {
    setShowAccountManagement(!showAccountManagement)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/104629ecba5539d78b57522618353fc0-ZwrWdJHsi0lgt6iHovefuNaJagD5iV.png"
            alt="肾卫士"
            width={120}
            height={40}
            className={styles.logoImage}
          />
        </Link>
        <input
          type="text"
          placeholder="搜索..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <div className={styles.userInfo}>
          {user ? (
            <div className={styles.avatarContainer} onClick={toggleAccountManagement}>
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                width={40}
                height={40}
                className={styles.avatar}
              />
              {showAccountManagement && <AccountManagement />}
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              登录
            </Link>
          )}
        </div>
      </div>
      {!isScrolled && (
        <nav className={styles.nav}>
          <Link href="/">主页</Link>
          <Link href="/history">历史记录</Link>
          <Link href="/suggestions">建议</Link>
        </nav>
      )}
    </header>
  )
}

export default Header

