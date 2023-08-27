import { getBaseUrl } from '@/lib/getBaseUrl'
import { MaidProfile } from '@prisma/client'

export default async function getMaidProfile({ id }: { id: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/maidsProfile/${id}`, {
      next: { revalidate: 10 },
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const maidProfile = (await res.json()) as MaidProfile

    return maidProfile
  } catch (e) {
    console.error(e)

    return {} as MaidProfile
  }
}
