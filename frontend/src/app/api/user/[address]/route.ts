import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { address: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      address: params.address.toLowerCase(),
    },
  })

  return NextResponse.json(user ?? { id: 0, name: 'NO NAME', address: '0x...', iconUrl: '' })
}

export const revalidate = 60 // 1 minute
