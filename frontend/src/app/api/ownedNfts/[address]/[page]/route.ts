import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import prisma from '@/lib/prisma'
import { ChainbaseResponse, OwnedAssetInfo, OwnedNFTs } from './ownedNft'
import type { AssetInfo } from '@/server/asset/asset'

const fetchOwnedNFTs = async ({ address, page }: { address: string; page: number }): Promise<OwnedAssetInfo> => {
  const response = (await fetch(
    `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}&limit=10`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  ).then((res) => res.json())) as unknown as ChainbaseResponse

  const ownedNFTs = response.data

  if (ownedNFTs === null) {
    return {} as OwnedAssetInfo
  }

  const maidProfiles = await prisma.maidProfile.findMany()

  const assets = [] as OwnedNFTs[]
  await Promise.all(
    ownedNFTs.map(async (nft) => {
      const res = await fetch(`https://api.cryptomaids.tokyo/metadata/crypto_maid/${nft.token_id}`)
      const asset = (await res.json()) as unknown as AssetInfo

      const index = maidProfiles.findIndex((e) => e.id === Number(nft.token_id))
      if (index !== -1) {
        assets.push({ ...nft, ...asset, name: maidProfiles[index].name })
      } else {
        assets.push({ ...nft, ...asset })
      }
    })
  )

  return { assets, next_page: response.next_page }
}

export async function GET(_req: NextRequest, { params }: { params: { address: string; page: number } }) {
  const ownedNfts = await fetchOwnedNFTs({ address: params.address, page: params.page })

  return NextResponse.json(ownedNfts)
}

export const revalidate = 60 // 1 minute
