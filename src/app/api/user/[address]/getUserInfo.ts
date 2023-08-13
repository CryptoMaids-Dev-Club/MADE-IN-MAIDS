import { getBaseUrl } from '@/lib/getBaseUrl'
import { User } from '@prisma/client'

export default async function getUserInfo({ address }: { address: string }) {
  if (address === undefined) {
    return { name: 'NO NAME', address: '0x...', iconUrl: '' }
  }

  try {
    const res = await fetch(`${getBaseUrl()}/api/user/${address}`, {
      next: { revalidate: 5 },
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const userInfo = (await res.json()) as User

    return userInfo
  } catch (e) {
    console.error(e)

    return { name: 'NO NAME', address: '0x...', iconUrl: '' } as User
  }
}
