import { TopUserInfo } from '@/app/api/prediction/prediction'
import { getBaseUrl } from '@/lib/getBaseUrl'
import 'server-only'

export default async function getTopUser() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/prediction/topUser`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const topUserInfos = (await res.json()) as TopUserInfo[]

    return topUserInfos
  } catch (e) {
    console.error(e)

    return [{}] as TopUserInfo[]
  }
}

export const revalidate = 10 // 10 seconds
