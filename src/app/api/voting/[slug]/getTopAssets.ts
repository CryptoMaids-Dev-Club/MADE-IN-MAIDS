import getAsset from '@/app/api/asset/[id]/getAsset'
import { getBaseUrl } from '@/lib/getBaseUrl'
import type { TopAsset, Vote } from './voting'
import 'server-only'

export default async function getTopAssets({ slug }: { slug: number }) {
  try {
    console.log('iiiiii')
    console.log(slug)
    const url = `${getBaseUrl()}/api/voting/${slug}`
    console.log(url)
    const res = await fetch(`${getBaseUrl()}/api/voting/${slug}`)

    console.log('uuuuuuu')
    console.log(res)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const topVotes = (await res.json()) as Vote[]
    console.log('eeeeeee')
    console.log(topVotes)

    const topAssets = [] as TopAsset[]

    await Promise.all(
      topVotes.map(async (vote, index) => {
        const asset = await getAsset({ id: vote.id })
        topAssets.push({ ...vote, ...asset, rank: index + 1 })
      })
    )

    return topAssets
  } catch (e) {
    console.log('error')
    console.error(e)

    return [] as TopAsset[]
  }
}

// export const revalidate = 10 // 10 seconds
