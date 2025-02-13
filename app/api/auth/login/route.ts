import { NextResponse } from "next/server"
import { login } from "../../../../server/auth"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const result = await login(username, password)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: "登录失败" }, { status: 500 })
  }
}

