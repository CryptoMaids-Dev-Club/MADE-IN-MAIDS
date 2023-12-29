import { NFTHolder } from './nftHolder'

export default async function getNftHolder({ page }: { page: number }) {
  try {
    const res = await fetch(`/api/nftHolder/${page}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const holders = (await res.json()) as NFTHolder[]

    return holders
  } catch (e) {
    console.error(e)

    return []
  }
}

export const revalidate = 60 * 60 // 1 hour
