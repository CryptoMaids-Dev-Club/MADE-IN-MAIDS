import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import { MaidsHolder } from './maidsHolder'

const fetchMaidsHolder = async ({ page }: { page: number }): Promise<MaidsHolder> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/token/top-holders?chain_id=137&contract_address=0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF&page=${page}&limit=20`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const holders = (await response.json()).data as unknown as MaidsHolder

  return holders
}

export async function GET(_req: NextRequest, { params }: { params: { page: number } }) {
  const data = await fetchMaidsHolder({ page: params.page })

  return NextResponse.json(data)
}

export const revalidate = 60 * 60 // 1 hour
