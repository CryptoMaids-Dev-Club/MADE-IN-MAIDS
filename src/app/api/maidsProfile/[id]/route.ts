import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { recoverMessageAddress } from 'viem'
import { CHAINBASE_API_KEY } from '@/config'
import type { MaidProfileUpdate } from './maidProfileUpdate'

export async function GET(_req: NextRequest, { params }: { params: { id: number } }) {
  const maidProfile = await prisma.maidProfile.findUnique({
    where: {
      id: Number(params.id),
    },
  })

  return NextResponse.json(maidProfile)
}

export async function POST(request: NextRequest) {
  const { id, name, character, description, address, signature } = (await request.json()) as MaidProfileUpdate
  const recoveredAddress = await recoverMessageAddress({
    message: 'Update Profile',
    signature: signature as `0x{string}`,
  })

  if (recoveredAddress.toLowerCase() !== address)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

  const res = await fetch(
    `https://api.chainbase.online/v1/nft/owner?chain_id=1&contract_address=0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7&token_id=${id}`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const owner = (await res.json()).data as string

  if (owner.toLowerCase() !== address) return NextResponse.json({ error: 'Invalid address' }, { status: 400 })

  const maidProfile = await prisma.maidProfile.upsert({
    where: {
      id: Number(id),
    },
    update: {
      name,
      character,
      description,
    },
    create: {
      id: Number(id),
      name,
      character,
      description,
    },
  })

  return NextResponse.json(maidProfile)
}

export const dynamic = 'force-dynamic'
