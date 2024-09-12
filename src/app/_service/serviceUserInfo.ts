import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetUser(id: string) {
  const response = await prisma.users.findMany({
    where: {
      id: id,
    },
  })

  return response
}
