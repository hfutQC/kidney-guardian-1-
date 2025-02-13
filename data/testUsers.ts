export const testUsers = [
  {
    id: 1,
    username: "张三",
    password: "123456",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/touxiang-vHEawVybBvBr9jILYDg7Q3Fbc44mUR.png",
    medicalHistory: ["2023-09-01 肾功能检查", "2023-10-15 复查", "2024-01-20 年度体检"],
    personalInfo: {
      name: "张三",
      age: 45,
      gender: "男",
      phone: "13800138000",
      emergencyContact: "李四 13900139000",
    },
    medicalRecords: [
      {
        date: "2024-01-20",
        type: "年度体检",
        result: "肾功能指标正常，建议继续保持当前治疗方案",
        doctor: "李医生",
        prescription: "维持现有用药方案",
        nextAppointment: "2024-04-20",
      },
      {
        date: "2023-10-15",
        type: "复查",
        result: "肌酐水平有所下降，治疗效果良好",
        doctor: "李医生",
        prescription: "继续服用降肌酐药物，每日三次",
        nextAppointment: "2024-01-20",
      },
      {
        date: "2023-09-01",
        type: "肾功能检查",
        result: "肌酐偏高，需要进行治疗",
        doctor: "李医生",
        prescription: "开始服用降肌酐药物",
        nextAppointment: "2023-10-15",
      },
    ],
  },
]

