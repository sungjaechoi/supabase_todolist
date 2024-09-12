import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceAllUserInfo() {
  const response = await prisma.userinfo.findMany()

  return response
}
