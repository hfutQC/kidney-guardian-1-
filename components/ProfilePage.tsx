"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import styles from "../styles/ProfilePage.module.css"
import ProfileHeader from "./ProfileHeader"
import Image from "next/image"
import TestResultForm from "./TestResultForm"

interface MedicalRecord {
  id: number
  date: string
  type: string
  result: string
  doctor: string
  prescription: string
  nextAppointment: string
}

interface DoctorInfo {
  name: string
  department: string
  title: string
  specialties: string[]
  officeHours: string
}

interface PatientGroup {
  id: number
  name: string
  memberCount: number
  description: string
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("history")
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null)
  const [patientGroups, setPatientGroups] = useState<PatientGroup[]>([])

  useEffect(() => {
    if (user) {
      fetchMedicalRecords()
      fetchDoctorInfo()
      fetchPatientGroups()
    }
  }, [user])

  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch("/api/medical-records", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setMedicalRecords(data.records)
      }
    } catch (error) {
      console.error("Failed to fetch medical records:", error)
    }
  }

  const fetchDoctorInfo = async () => {
    try {
      const response = await fetch("/api/doctor", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setDoctorInfo(data)
      }
    } catch (error) {
      console.error("Failed to fetch doctor info:", error)
    }
  }

  const fetchPatientGroups = async () => {
    try {
      const response = await fetch("/api/patient-groups", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setPatientGroups(data.groups)
      }
    } catch (error) {
      console.error("Failed to fetch patient groups:", error)
    }
  }

  const renderHistory = () => (
    <div className={styles.historySection}>
      <h2>就诊记录</h2>
      <div className={styles.records}>
        {medicalRecords.map((record) => (
          <div key={record.id} className={styles.record}>
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
      {doctorInfo && (
        <div className={styles.doctorCard}>
          <div className={styles.doctorInfo}>
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt={doctorInfo.name}
              width={120}
              height={120}
              className={styles.doctorImage}
            />
            <div className={styles.doctorDetails}>
              <h3>{doctorInfo.name}</h3>
              <p>
                <strong>科室：</strong>
                {doctorInfo.department}
              </p>
              <p>
                <strong>职称：</strong>
                {doctorInfo.title}
              </p>
              <p>
                <strong>专长：</strong>
                {doctorInfo.specialties.join(", ")}
              </p>
              <p>
                <strong>门诊时间：</strong>
                {doctorInfo.officeHours}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderPatients = () => (
    <div className={styles.patientsSection}>
      <h2>病友圈</h2>
      <div className={styles.patientGroups}>
        {patientGroups.map((group) => (
          <div key={group.id} className={styles.group}>
            <h3>{group.name}</h3>
            <p>成员：{group.memberCount}人</p>
            <p>简介：{group.description}</p>
          </div>
        ))}
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

