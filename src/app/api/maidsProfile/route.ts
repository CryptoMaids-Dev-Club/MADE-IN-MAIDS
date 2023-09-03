import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const profiles = await prisma.maidProfile.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
  })

  return NextResponse.json(profiles)
}
