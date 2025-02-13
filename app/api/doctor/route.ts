import { NextResponse } from "next/server"
import { getDoctorInfo } from "../../../../server/doctor"
import { authMiddleware, type AuthenticatedRequest } from "../../../../server/middleware/auth"

async function handler(req: AuthenticatedRequest) {
  if (!req.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 })
  }

  try {
    const doctorInfo = await getDoctorInfo(req.user.id)
    return NextResponse.json(doctorInfo)
  } catch (error) {
    return NextResponse.json({ error: "获取责任医师信息失败" }, { status: 500 })
  }
}

export const GET = authMiddleware(handler)

