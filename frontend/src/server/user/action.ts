'use server'

import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { Address } from 'viem'
import prisma from '@/lib/prisma'
import { verifySignature } from '@/utils/signature'

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
  if (iconUrl.indexOf('https://cryptomaids-metadata.s3.amazonaws.com/') !== 0) throw new Error('Invalid iconUrl')

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

export const updateUserInfo = async ({
  name,
  address,
  iconUrl,
  signature,
}: {
  name: string
  address: string
  iconUrl: string
  signature: string
}) => {
  const lowerAddress = address.toLowerCase() as Address

  const verify = await verifySignature(lowerAddress, 'Update Profile', signature as Address)
  if (!verify) return { error: 'Invalid signature' }

  let user: User = { id: 0, name: '', address: '', iconUrl: '' }
  if (name !== '') {
    user = await updateName(address.toLowerCase(), name)
  } else if (iconUrl !== '') {
    user = await updateIconUrl(address.toLowerCase(), iconUrl)
  }
  revalidatePath('/')

  return user
}
