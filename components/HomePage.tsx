"use client"

import type React from "react"
import styles from "../styles/HomePage.module.css"

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <h1>欢迎来到肾卫士</h1>
        <p>您的肾脏健康守护者</p>
      </section>
      <section className={styles.features}>
        <h2>我们的服务</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <h3>专业咨询</h3>
            <p>与经验丰富的肾脏专科医生在线交流</p>
          </div>
          <div className={styles.feature}>
            <h3>健康监测</h3>
            <p>定期跟踪您的肾脏健康指标</p>
          </div>
          <div className={styles.feature}>
            <h3>饮食指导</h3>
            <p>为您定制适合肾脏健康的饮食方案</p>
          </div>
          <div className={styles.feature}>
            <h3>用药提醒</h3>
            <p>帮助您按时服药，提高治疗效果</p>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <h2>关于我们</h2>
        <p>
          肾卫士致力于为您提供最专业、最贴心的肾脏健康服务。我们的团队由经验丰富的肾脏专科医生、营养师和健康顾问组成，旨在帮助您更好地管理肾脏健康，提高生活质量。
        </p>
      </section>
    </div>
  )
}

export default HomePage

