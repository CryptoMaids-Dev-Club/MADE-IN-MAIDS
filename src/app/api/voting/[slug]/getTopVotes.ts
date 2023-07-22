import { getBaseUrl } from '@/lib/getBaseUrl'
import 'server-only'
import type { Vote } from './voting'

export default async function getTopVotes({ slug }: { slug: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/voting/${slug}`, {
      next: { revalidate: 5 },
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const topVotes = (await res.json()) as Vote[]

    return topVotes
  } catch (e) {
    return [{}] as Vote[]
  }
}
