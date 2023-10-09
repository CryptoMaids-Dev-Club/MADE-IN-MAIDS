import { TopUserInfo } from '@/app/api/prediction/prediction'
import 'server-only'

export default async function getTopUser() {
  try {
    const res = await fetch(
      `https://made-in-maids-git-feature-prediction-maids-dev-club.vercel.app/api/prediction/topUser`
    )

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
