import { NextResponse } from "next/server"
import { getUserInfo } from "../../../../server/user"
import { authMiddleware, type AuthenticatedRequest } from "../../../../server/middleware/auth"

async function handler(req: AuthenticatedRequest) {
  if (!req.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 })
  }

  try {
    const userInfo = await getUserInfo(req.user.id)
    return NextResponse.json(userInfo)
  } catch (error) {
    return NextResponse.json({ error: "获取用户信息失败" }, { status: 500 })
  }
}

export const GET = authMiddleware(handler)

