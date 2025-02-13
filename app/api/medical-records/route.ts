import { NextResponse } from "next/server"
import { getMedicalRecords } from "../../../../server/medicalRecords"
import { authMiddleware, type AuthenticatedRequest } from "../../../../server/middleware/auth"

async function handler(req: AuthenticatedRequest) {
  if (!req.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 })
  }

  try {
    const records = await getMedicalRecords(req.user.id)
    return NextResponse.json(records)
  } catch (error) {
    return NextResponse.json({ error: "获取就诊记录失败" }, { status: 500 })
  }
}

export const GET = authMiddleware(handler)

