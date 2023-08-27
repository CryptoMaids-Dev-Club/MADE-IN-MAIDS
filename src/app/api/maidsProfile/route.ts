import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const maidProfiles = await prisma.maidProfile.findMany()

  return NextResponse.json(maidProfiles)
}

export const dynamic = 'force-dynamic'
