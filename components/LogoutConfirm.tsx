import type React from "react"
import styles from "../styles/LogoutConfirm.module.css"

interface LogoutConfirmProps {
  onConfirm: () => void
  onCancel: () => void
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ onConfirm, onCancel }) => {
  console.log('LogoutConfirm rendered');
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.title}>提示</span>
          <button onClick={onCancel} className={styles.closeButton} aria-label="关闭">
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.warningText}>确定要退出吗？</p>
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.buttonGroup}>
            <button onClick={onCancel} className={styles.cancelButton}>
              取消
            </button>
            <button onClick={onConfirm} className={styles.confirmButton}>
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirm

