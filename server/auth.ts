import prisma from "./db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return { success: false, error: "用户名或密码错误" }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return { success: false, error: "用户名或密码错误" }
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  })

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      token,
    },
  }
}

export async function logout() {
  // 在实际应用中，这里可能需要处理令牌失效等逻辑
  return { success: true }
}

