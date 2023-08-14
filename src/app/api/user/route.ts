import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(_req: NextRequest) {
  const user = await prisma.user.findMany()

  return NextResponse.json(user)
}
