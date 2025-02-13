"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import styles from "../styles/ProfilePage.module.css"
import ProfileHeader from "./ProfileHeader"
import Image from "next/image"
import TestResultForm from "./TestResultForm"

const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("history")

  const renderHistory = () => (
    <div className={styles.historySection}>
      <h2>就诊记录</h2>
      <div className={styles.records}>
        {user?.medicalRecords?.map((record, index) => (
          <div key={index} className={styles.record}>
            <div className={styles.recordHeader}>
              <span className={styles.date}>{record.date}</span>
              <span className={styles.type}>{record.type}</span>
            </div>
            <div className={styles.recordContent}>
              <p>
                <strong>检查结果：</strong>
                {record.result}
              </p>
              <p>
                <strong>主治医师：</strong>
                {record.doctor}
              </p>
              <p>
                <strong>处方建议：</strong>
                {record.prescription}
              </p>
              <p>
                <strong>下次复诊：</strong>
                {record.nextAppointment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDoctor = () => (
    <div className={styles.doctorSection}>
      <h2>责任医师</h2>
      <div className={styles.doctorCard}>
        <div className={styles.doctorInfo}>
          <Image
            src="/placeholder.svg?height=120&width=120"
            alt="李医生"
            width={120}
            height={120}
            className={styles.doctorImage}
          />
          <div className={styles.doctorDetails}>
            <h3>李医生</h3>
            <p>
              <strong>科室：</strong>肾内科
            </p>
            <p>
              <strong>职称：</strong>主任医师
            </p>
            <p>
              <strong>专长：</strong>慢性肾病、肾功能衰竭、血液透析
            </p>
            <p>
              <strong>门诊时间：</strong>周一至周五 9:00-17:00
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPatients = () => (
    <div className={styles.patientsSection}>
      <h2>病友圈</h2>
      <div className={styles.patientGroups}>
        <div className={styles.group}>
          <h3>慢性肾病互助组</h3>
          <p>成员：128人</p>
          <p>简介：交流慢性肾病康复经验，分享治疗心得</p>
        </div>
        <div className={styles.group}>
          <h3>血透病友会</h3>
          <p>成员：86人</p>
          <p>简介：为血透患者提供经验分享和心理支持</p>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "history":
        return renderHistory()
      case "doctor":
        return renderDoctor()
      case "patients":
        return renderPatients()
      case "testResult":
        return <TestResultForm />
      default:
        return null
    }
  }

  if (!user) {
    return <div className={styles.loginPrompt}>请先登录</div>
  }

  return (
    <div className={styles.profilePage}>
      <ProfileHeader />
      <div className={styles.profileContent}>
        <div className={styles.sidebar}>
          <button
            className={`${styles.tab} ${activeTab === "history" ? styles.active : ""}`}
            onClick={() => setActiveTab("history")}
          >
            就诊记录
          </button>
          <button
            className={`${styles.tab} ${activeTab === "doctor" ? styles.active : ""}`}
            onClick={() => setActiveTab("doctor")}
          >
            责任医师
          </button>
          <button
            className={`${styles.tab} ${activeTab === "patients" ? styles.active : ""}`}
            onClick={() => setActiveTab("patients")}
          >
            病友圈
          </button>
          <button
            className={`${styles.tab} ${activeTab === "testResult" ? styles.active : ""}`}
            onClick={() => setActiveTab("testResult")}
          >
            提交检测结果
          </button>
        </div>
        <div className={styles.mainContent}>{renderContent()}</div>
      </div>
    </div>
  )
}

export default ProfilePage

