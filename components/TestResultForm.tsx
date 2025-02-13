"use client"

import type React from "react"
import { useState } from "react"
import styles from "../styles/TestResultForm.module.css"

const TestResultForm: React.FC = () => {
  const [formData, setFormData] = useState({
    urea: "",
    creatinine: "",
    cystatin: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加提交逻辑，但目前我们只是打印数据
    console.log("提交的数据:", formData)
  }

  return (
    <div className={styles.formContainer}>
      <h2>提交检测结果</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="urea">尿素氮 (mmol/L)</label>
          <input type="number" id="urea" name="urea" value={formData.urea} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="creatinine">血清肌酐 (μmol/L)</label>
          <input
            type="number"
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
            id="cystatin"
            name="cystatin"
            value={formData.cystatin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          提交
        </button>
      </form>
    </div>
  )
}

export default TestResultForm

