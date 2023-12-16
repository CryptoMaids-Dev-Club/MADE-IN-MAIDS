import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'

const getNftOwner = async ({ id }: { id: number }): Promise<string> => {
  const res = await fetch(
    `https://api.chainbase.online/v1/nft/owner?chain_id=1&contract_address=0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7&token_id=${id}`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const owner = (await res.json()).data as unknown as string

  return owner
}

export async function GET(_req: NextRequest, { params }: { params: { id: number } }) {
  const data = await getNftOwner({ id: params.id })

  return NextResponse.json(data)
}

export const revalidate = 60 // 1 minute
