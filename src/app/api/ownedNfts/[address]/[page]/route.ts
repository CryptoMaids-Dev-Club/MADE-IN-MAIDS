import { CHAINBASE_API_KEY } from '@/config'
import { NextRequest, NextResponse } from 'next/server'
import { OwnedAssetInfo, OwnedNFTs, OwnedResponse } from './ownedNft'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

const fetchOwnedNFTs = async ({ address, page }: { address: string; page: number }): Promise<OwnedAssetInfo> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}&limit=10`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const ownedNFTs = (await response.json()) as unknown as OwnedResponse

  if (ownedNFTs.data === null) {
    console.log('null')

    return {} as OwnedAssetInfo
  }

  const assets = [] as OwnedNFTs[]
  await Promise.all(
    ownedNFTs.data.map(async (nft) => {
      const res = await fetch(`https://api.cryptomaids.tokyo/metadata/crypto_maid/${nft.token_id}`)
      const asset = (await res.json()) as unknown as AssetInfo
      assets.push({ ...nft, ...asset })
    })
  )

  return { assets, next_page: ownedNFTs.next_page }
}

export async function GET(_req: NextRequest, { params }: { params: { address: string; page: number } }) {
  const data = await fetchOwnedNFTs({ address: params.address, page: params.page })

  return NextResponse.json(data)
}
