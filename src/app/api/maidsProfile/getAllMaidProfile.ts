import { getBaseUrl } from '@/lib/getBaseUrl'
import { MaidProfile } from '@prisma/client'

export default async function getAllMaidProfile() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/maidsProfile`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const maidProfiles = (await res.json()) as MaidProfile[]

    return maidProfiles
  } catch (e) {
    console.error(e)

    return {} as MaidProfile[]
  }
}
