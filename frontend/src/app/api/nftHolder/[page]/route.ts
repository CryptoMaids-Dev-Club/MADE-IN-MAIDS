import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import { NFTHolder } from './nftHolder'

const fetchNFTHolder = async ({ page }: { page: number }): Promise<NFTHolder> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/nft/owners?chain_id=1&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const holders = (await response.json()).data as unknown as NFTHolder

  return holders
}

export async function GET(_req: NextRequest, { params }: { params: { page: number } }) {
  const data = await fetchNFTHolder({ page: params.page })

  return NextResponse.json(data)
}

export const revalidate = 60 * 60 // 1 hour
