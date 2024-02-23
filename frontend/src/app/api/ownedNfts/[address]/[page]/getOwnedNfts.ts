import { Address } from 'viem'
import type { OwnedAssetInfo } from '@/app/api/ownedNfts/[address]/[page]/ownedNft'

export default async function getNftHolder(address: Address, page: number) {
  try {
    const res = await fetch(`/api/ownedNfts/${address}/${page}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const ownedNfts = (await res.json()) as OwnedAssetInfo

    return ownedNfts
  } catch (e) {
    console.error(e)

    return null
  }
}

export const revalidate = 60 // 1 minute
