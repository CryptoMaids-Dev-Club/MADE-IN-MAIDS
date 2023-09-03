import 'server-only'
import { prisma } from '@/lib/prisma'

export const getRecentlyUpdateProfiles = async () => {
  const profiles = await prisma.maidProfile.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
  })

  return profiles
}

export const dynamic = 'force-dynamic'
