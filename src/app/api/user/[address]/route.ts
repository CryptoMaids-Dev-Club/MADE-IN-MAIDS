/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// For Client Components
export async function GET(_req: NextRequest, { params }: { params: { address: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      address: params.address.toLowerCase(),
    },
  })

  return NextResponse.json(user)
}
