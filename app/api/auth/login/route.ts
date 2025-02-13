import { NextResponse } from "next/server"
import { authenticate, type LoginCredentials } from "../../../../server/auth"

export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json()
    const result = await authenticate(credentials)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

