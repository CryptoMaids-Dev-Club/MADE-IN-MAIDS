import getAsset from '@/app/api/asset/[id]/getAsset'
import { getBaseUrl } from '@/lib/getBaseUrl'
import type { TopAsset, Vote } from './voting'
import 'server-only'

export default async function getTopAssets({ slug }: { slug: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/voting/${slug}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const topVotes = (await res.json()) as Vote[]

    const topAssets = [] as TopAsset[]

    await Promise.all(
      topVotes.map(async (vote, index) => {
        const asset = await getAsset({ id: vote.id })
        topAssets.push({ ...vote, ...asset, rank: index + 1 })
      })
    )

    return topAssets
  } catch (e) {
    console.error(e)

    return [{}] as TopAsset[]
  }
}

export const revalidate = 10 // 10 seconds
