'use server'

import { recoverMessageAddress } from 'viem'
import { prisma } from '@/lib/prisma'

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

export default async function updateUserInfo({
  name,
  address,
  iconUrl,
  signature,
}: {
  name: string
  address: string
  iconUrl: string
  signature: string
}) {
  const lowerAddress = address.toLowerCase()

  const recoveredAddress = await recoverMessageAddress({
    message: 'Update Profile',
    signature: signature as `0x{string}`,
  })

  if (recoveredAddress.toLowerCase() !== lowerAddress) return { error: 'Invalid signature' }

  let user
  if (name !== '') {
    user = await updateName(address.toLowerCase(), name)
  } else if (iconUrl !== '') {
    user = await updateIconUrl(address.toLowerCase(), iconUrl)
  }

  return user
}
