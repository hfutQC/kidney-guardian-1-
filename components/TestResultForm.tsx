"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import styles from "../styles/TestResultForm.module.css"

const TestResultForm: React.FC = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    urea: "",
    creatinine: "",
    cystatin: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("请先登录")
      return
    }

    setSubmitStatus("loading")
    try {
      const response = await fetch("/api/test-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          date: new Date().toISOString().split("T")[0],
          urea: "",
          creatinine: "",
          cystatin: "",
        })
      } else {
        throw new Error("提交失败")
      }
    } catch (error) {
      console.error("提交检测结果失败:", error)
      setSubmitStatus("error")
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>提交检测结果</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="date">检测日期</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="urea">尿素氮 (mmol/L)</label>
          <input
            type="number"
            step="0.1"
            id="urea"
            name="urea"
            value={formData.urea}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="creatinine">血清肌酐 (μmol/L)</label>
          <input
            type="number"
            step="0.1"
            id="creatinine"
            name="creatinine"
            value={formData.creatinine}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cystatin">胱抑素 C (mg/L)</label>
          <input
            type="number"
            step="0.01"
            id="cystatin"
            name="cystatin"
            value={formData.cystatin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={submitStatus === "loading"}>
          {submitStatus === "loading" ? "提交中..." : "提交"}
        </button>
      </form>
      {submitStatus === "success" && <p className={styles.successMessage}>提交成功！</p>}
      {submitStatus === "error" && <p className={styles.errorMessage}>提交失败，请重试。</p>}
    </div>
  )
}

export default TestResultForm

