"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import styles from "../../styles/SubmissionRecord.module.css"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
      fetchTestResults()
    }
  }, [user, router])

  const fetchTestResults = async () => {
    try {
      const response = await fetch("/api/test-results", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setTestResults(
          data.results.sort((a: TestResult, b: TestResult) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        )
      }
    } catch (error) {
      console.error("Failed to fetch test results:", error)
    }
  }

  const chartData = {
    labels: testResults.map((result) => result.date),
    datasets: [
      {
        label: "尿素氮 (mmol/L)",
        data: testResults.map((result) => result.urea),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "血清肌酐 (μmol/L)",
        data: testResults.map((result) => result.creatinine),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "胱抑素 C (mg/L)",
        data: testResults.map((result) => result.cystatin),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "检测结果趋势图",
      },
    },
  }

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "日期,尿素氮 (mmol/L),血清肌酐 (μmol/L),胱抑素 C (mg/L)\n" +
      testResults.map((result) => `${result.date},${result.urea},${result.creatinine},${result.cystatin}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "检测结果记录.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!user) {
    return null // 或者显示加载中的 UI
  }

  return (
    <div className={styles.container}>
      <h1>提交记录</h1>
      <div className={styles.chartContainer}>
        <Line options={chartOptions} data={chartData} />
      </div>
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
      <button className={styles.exportButton} onClick={handleExport}>
        导出数据
      </button>
    </div>
  )
}

export default SubmissionRecordPage

