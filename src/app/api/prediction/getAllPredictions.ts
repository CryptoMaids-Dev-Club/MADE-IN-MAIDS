import { Prediction } from '@/app/api/prediction/prediction'
import 'server-only'

export default async function getAllPredictions() {
  try {
    const res = await fetch(`https://made-in-maids-git-feature-prediction-maids-dev-club.vercel.app/api/prediction`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const predictions = (await res.json()) as Prediction[]

    return predictions
  } catch (e) {
    console.error(e)

    return [] as Prediction[]
  }
}

export const revalidate = 10 // 10 seconds
