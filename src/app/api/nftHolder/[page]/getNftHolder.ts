import { getBaseUrl } from '@/lib/getBaseUrl'
import { NFTHolder } from './nftHolder'

export default async function getNftHolder({ page }: { page: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/nftHolder/${page}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const holders = (await res.json()) as NFTHolder[]

    return holders
  } catch (e) {
    console.log(e)

    return {} as NFTHolder[]
  }
}
