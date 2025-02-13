import prisma from "./db"

export async function getMedicalRecords(userId: number) {
  const records = await prisma.medicalRecord.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  })

  return { records }
}

