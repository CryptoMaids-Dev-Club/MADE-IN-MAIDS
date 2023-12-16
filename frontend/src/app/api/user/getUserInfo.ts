import prisma from '@/lib/prisma'
import 'server-only'

export default async function getUserInfo({ address }: { address: string }) {
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
