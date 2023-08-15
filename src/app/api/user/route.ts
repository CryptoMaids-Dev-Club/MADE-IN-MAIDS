import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const user = await prisma.user.findMany()

  return NextResponse.json(user)
}

export const dynamic = 'force-dynamic'
