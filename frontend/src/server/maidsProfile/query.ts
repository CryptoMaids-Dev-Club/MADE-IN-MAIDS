import { MaidProfile } from '@prisma/client'
import prisma from '@/lib/prisma'
import 'server-only'

export const getMaidProfile = async (id: number) => {
  const maidProfile = await prisma.maidProfile.findUnique({
    where: {
      id: Number(id),
    },
  })
  return maidProfile as MaidProfile
}

export const getRecentlyUpdateProfiles = async () => {
  const profiles = await prisma.maidProfile.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
  })
  return profiles as MaidProfile[]
}
