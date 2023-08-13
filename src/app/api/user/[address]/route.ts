/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client'
import { recoverMessageAddress } from 'viem'

const prisma = new PrismaClient()

async function updateName(address: string, name: string) {
  const user = await prisma.user.upsert({
    where: {
      address,
    },
    update: {
      name,
    },
    create: {
      name,
      address,
      iconUrl: '',
    },
  })

  return user
}

async function updateIconUrl(address: string, iconUrl: string) {
  if (iconUrl.indexOf('https://cryptomaids-metadata.s3.amazonaws.com/') !== 0) return {}

  const user = await prisma.user.upsert({
    where: {
      address,
    },
    update: {
      iconUrl,
    },
    create: {
      name: 'NO NAME',
      address,
      iconUrl,
    },
  })

  return user
}

export async function GET(_req: NextRequest, { params }: { params: { address: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      address: params.address,
    },
  })

  return NextResponse.json(user)
}

export async function POST(request: NextRequest) {
  const { name, address, iconUrl, signature } = await request.json()
  const recoveredAddress = await recoverMessageAddress({
    message: 'Update Profile',
    signature,
  })
  if (recoveredAddress !== address) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

  let user
  if (name !== '') {
    user = await updateName(address as string, name as string)
  } else if (iconUrl !== '') {
    user = await updateIconUrl(address as string, iconUrl as string)
  }

  return NextResponse.json(user)
}
