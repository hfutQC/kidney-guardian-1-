import prisma from "./db"

export async function getDoctorInfo(userId: number) {
  const doctor = await prisma.doctor.findFirst({
    where: { patients: { some: { id: userId } } },
  })

  if (!doctor) {
    throw new Error("未找到责任医师信息")
  }

  return {
    name: doctor.name,
    department: doctor.department,
    title: doctor.title,
    specialties: doctor.specialties,
    officeHours: doctor.officeHours,
  }
}

