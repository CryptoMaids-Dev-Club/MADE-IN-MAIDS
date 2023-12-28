import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import { MaidsHolder, ChainbaseResponse } from './maidsHolder'

const fetchMaidsHolder = async ({ page }: { page: number }): Promise<MaidsHolder[]> => {
  const response = (await fetch(
    `https://api.chainbase.online/v1/token/top-holders?chain_id=137&contract_address=0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF&page=${page}&limit=20`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  ).then((res) => res.json())) as unknown as ChainbaseResponse

  return response.data
}

export async function GET(_req: NextRequest, { params }: { params: { page: number } }) {
  const maidsHolder = await fetchMaidsHolder({ page: params.page })

  return NextResponse.json(maidsHolder)
}

export const revalidate = 60 * 60 // 1 hour
export const runtime = 'edge'
