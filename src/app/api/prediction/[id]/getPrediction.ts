import { Prediction } from '@/app/api/prediction/prediction'
import { getBaseUrl } from '@/lib/getBaseUrl'
import 'server-only'

export default async function getPrediction({ id }: { id: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/prediction/${id}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const prediction = (await res.json()) as Prediction

    return prediction
  } catch (e) {
    console.error(e)

    return {} as Prediction
  }
}

export const revalidate = 10 // 10 seconds
