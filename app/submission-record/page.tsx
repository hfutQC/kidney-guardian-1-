"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import styles from "../../styles/SubmissionRecord.module.css"

interface TestResult {
  id: number
  date: string
  urea: number
  creatinine: number
  cystatin: number
}

const SubmissionRecordPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [testResults, setTestResults] = useState<TestResult[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      // 这里应该从后端 API 获取数据
      // 现在我们使用模拟数据
      const mockData: TestResult[] = [
        { id: 1, date: "2024-02-13", urea: 5.7, creatinine: 80, cystatin: 0.9 },
        { id: 2, date: "2024-01-15", urea: 6.2, creatinine: 85, cystatin: 1.1 },
        { id: 3, date: "2023-12-20", urea: 5.9, creatinine: 82, cystatin: 1.0 },
      ]
      setTestResults(mockData)
    }
  }, [user, router])

  if (!user) {
    return null // 或者显示加载中的 UI
  }

  return (
    <div className={styles.container}>
      <h1>提交记录</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>日期</th>
            <th>尿素氮 (mmol/L)</th>
            <th>血清肌酐 (μmol/L)</th>
            <th>胱抑素 C (mg/L)</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((result) => (
            <tr key={result.id}>
              <td>{result.date}</td>
              <td>{result.urea}</td>
              <td>{result.creatinine}</td>
              <td>{result.cystatin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubmissionRecordPage

