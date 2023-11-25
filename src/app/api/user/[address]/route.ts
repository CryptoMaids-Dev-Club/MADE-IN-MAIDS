import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// For Client Components
export async function GET(_req: NextRequest, { params }: { params: { address: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      address: params.address.toLowerCase(),
    },
  })

  return NextResponse.json(user)
}

export const revalidate = 60 // 1 minute
