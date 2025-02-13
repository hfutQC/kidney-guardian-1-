import { NextResponse } from "next/server"
import { getPatientGroups } from "../../../../server/patientGroups"
import { authMiddleware, type AuthenticatedRequest } from "../../../../server/middleware/auth"

async function handler(req: AuthenticatedRequest) {
  if (!req.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 })
  }

  try {
    const groups = await getPatientGroups()
    return NextResponse.json(groups)
  } catch (error) {
    return NextResponse.json({ error: "获取病友圈信息失败" }, { status: 500 })
  }
}

export const GET = authMiddleware(handler)

