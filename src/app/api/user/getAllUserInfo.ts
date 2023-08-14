import { getBaseUrl } from '@/lib/getBaseUrl'
import { User } from '@prisma/client'
import 'server-only'

export default async function getAllUserInfo() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/user`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const userInfos = (await res.json()) as User[]

    return userInfos
  } catch (e) {
    console.error(e)

    return [] as User[]
  }
}
