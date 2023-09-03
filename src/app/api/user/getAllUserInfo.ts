import { prisma } from '@/lib/prisma'
import 'server-only'

export default async function getAllUserInfo() {
  const user = await prisma.user.findMany()

  return user
}
