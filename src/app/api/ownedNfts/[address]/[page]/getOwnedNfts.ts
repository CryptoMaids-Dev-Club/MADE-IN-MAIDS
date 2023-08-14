import type { OwnedAssetInfo } from '@/app/api/ownedNfts/[address]/[page]/ownedNft'

export default async function getNftHolder({ address, page }: { address: string; page: number }) {
  try {
    const res = await fetch(`/api/ownedNfts/${address}/${page}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const ownedNfts = (await res.json()) as OwnedAssetInfo

    return ownedNfts
  } catch (e) {
    console.error(e)

    return {} as OwnedAssetInfo
  }
}
