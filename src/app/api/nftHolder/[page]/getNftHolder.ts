import { NFTHolder } from './nftHolder'

export default async function getNftHolder({ page }: { page: number }) {
  try {
    const res = await fetch(`https://made-in-maids-git-develop-maids-dev-club.vercel.app/api/nftHolder/${page}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const holders = (await res.json()) as NFTHolder[]

    return holders
  } catch (e) {
    console.error(e)

    return {} as NFTHolder[]
  }
}
