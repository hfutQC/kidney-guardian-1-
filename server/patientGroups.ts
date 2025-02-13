import prisma from "./db"

export async function getPatientGroups() {
  const groups = await prisma.patientGroup.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: { members: true },
      },
    },
  })

  return {
    groups: groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      memberCount: group._count.members,
    })),
  }
}

