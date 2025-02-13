import { NextResponse } from "next/server"
import { logout } from "../../../../server/auth"

export async function POST() {
  try {
    const result = await logout()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: "注销失败" }, { status: 500 })
  }
}

