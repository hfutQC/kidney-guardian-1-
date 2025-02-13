import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "../context/AuthContext"
import Header from "../components/Header"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "肾卫士医疗网站",
  description: "专业的肾脏健康服务平台",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'