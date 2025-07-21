import type { Address } from 'viem'
import prisma from '@/lib/prisma'
import 'server-only'

export const getAllUserInfo = async () => {
  const user = await prisma.user.findMany()

  return user
}

export const getUserInfo = async (address: Address) => {
  if (address === undefined) {
    return { id: 0, name: 'NO NAME', address: '0x...', iconUrl: '' }
  }

  const user = await prisma.user.findUnique({
    where: {
      address: address.toLowerCase(),
    },
  })

  return user ?? { id: 0, name: 'NO NAME', address: '0x...', iconUrl: '' }
}
