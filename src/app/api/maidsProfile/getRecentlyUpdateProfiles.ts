import type { MaidProfile } from '@prisma/client'
import { getBaseUrl } from '@/lib/getBaseUrl'
import 'server-only'

export const getRecentlyUpdateProfiles = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/maidsProfile`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const profiles = (await res.json()) as MaidProfile[]

    if (profiles.length === 0) {
      return [{}] as MaidProfile[]
    }

    return profiles
  } catch (e) {
    console.error(e)

    return [{}] as MaidProfile[]
  }
}
