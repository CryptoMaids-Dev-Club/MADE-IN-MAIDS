import { Prediction } from '@/app/api/prediction/prediction'
import { getBaseUrl } from '@/lib/getBaseUrl'
import 'server-only'

export default async function getAllPredictions() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/prediction`)

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

export const revalidate = 0 // ToDo: set to 10 seconds
