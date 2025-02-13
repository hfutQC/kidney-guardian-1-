import { NextResponse } from "next/server"
import { logout } from "../../../../server/auth"

export async function POST() {
  try {
    const result = await logout()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

