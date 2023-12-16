import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const profiles = await prisma.maidProfile.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
  })

  return NextResponse.json(profiles)
}

export const revalidate = 10
