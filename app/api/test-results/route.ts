import { NextResponse } from "next/server"
import { submitTestResult, getTestResults } from "../../../../server/testResults"
import { authMiddleware, type AuthenticatedRequest } from "../../../../server/middleware/auth"

async function getHandler(req: AuthenticatedRequest) {
  if (!req.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 })
  }

  try {
    const results = await getTestResults(req.user.id)
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: "获取检测结果失败" }, { status: 500 })
  }
}

async function postHandler(req: AuthenticatedRequest) {
  if (!req.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 })
  }

  try {
    const data = await req.json()
    const result = await submitTestResult(req.user.id, data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "提交检测结果失败" }, { status: 500 })
  }
}

export const GET = authMiddleware(getHandler)
export const POST = authMiddleware(postHandler)

