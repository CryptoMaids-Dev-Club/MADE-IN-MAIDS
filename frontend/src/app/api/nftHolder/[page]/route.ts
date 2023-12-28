import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import { ChainbaseResponse, NFTHolder } from './nftHolder'

const fetchNFTHolder = async ({ page }: { page: number }): Promise<NFTHolder[]> => {
  const response = (await fetch(
    `https://api.chainbase.online/v1/nft/owners?chain_id=1&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  ).then((res) => res.json())) as unknown as ChainbaseResponse

  return response.data
}

export async function GET(_req: NextRequest, { params }: { params: { page: number } }) {
  const nftHolder = await fetchNFTHolder({ page: params.page })

  return NextResponse.json(nftHolder)
}

export const revalidate = 60 * 60 // 1 hour
export const runtime = 'edge'
