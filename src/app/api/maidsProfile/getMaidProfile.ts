import { MaidProfile } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import 'server-only'

export default async function getMaidProfile({ id }: { id: number }) {
  const maidProfile = await prisma.maidProfile.findUnique({
    where: {
      id: Number(id),
    },
  })

  return maidProfile ?? ({} as MaidProfile)
}
