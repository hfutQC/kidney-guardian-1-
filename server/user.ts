import prisma from "./db"

export async function getUserInfo(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      avatar: true,
      personalInfo: true,
    },
  })

  if (!user) {
    throw new Error("用户不存在")
  }

  return user
}

