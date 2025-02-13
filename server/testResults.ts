import prisma from "./db"

export async function submitTestResult(
  userId: number,
  data: { date: string; urea: number; creatinine: number; cystatin: number },
) {
  await prisma.testResult.create({
    data: {
      ...data,
      userId,
    },
  })

  return { success: true }
}

export async function getTestResults(userId: number) {
  const results = await prisma.testResult.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  })

  return { results }
}

