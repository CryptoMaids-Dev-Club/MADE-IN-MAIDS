'use server'

import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { Address } from 'viem'
import { ZodError, z } from 'zod'
import prisma from '@/lib/prisma'
import { verifySignature } from '@/utils/signature'
import { UserSchema } from 'prisma/generated/zod'

async function updateName(address: Address, name: string) {
  const lowerAddress = address.toLowerCase()
  const user = await prisma.user.upsert({
    where: {
      address: lowerAddress,
    },
    update: {
      name,
    },
    create: {
      name,
      address: lowerAddress,
      iconUrl: '',
    },
  })

  return user
}

async function updateIconUrl(address: Address, iconUrl: string) {
  if (iconUrl.indexOf('https://cryptomaids-metadata.s3.amazonaws.com/') !== 0) throw new Error('Invalid iconUrl')

  const lowerAddress = address.toLowerCase()

  const user = await prisma.user.upsert({
    where: {
      address: lowerAddress,
    },
    update: {
      iconUrl,
    },
    create: {
      name: 'NO NAME',
      address: lowerAddress,
      iconUrl,
    },
  })

  return user
}

const updateUserInfoSchema = UserSchema.omit({ id: true }).merge(z.object({ signature: z.string() }))
type UpdateUserInfoSchema = z.infer<typeof updateUserInfoSchema>

export const updateUserInfo = async (data: UpdateUserInfoSchema) => {
  try {
    const { address, name, iconUrl, signature } = updateUserInfoSchema.parse(data)

    const verify = await verifySignature(address as Address, 'Update Profile', signature as Address)
    if (!verify) return { error: 'Invalid signature' }

    let user: User = { id: 0, name: '', address: '', iconUrl: '' }
    if (name !== '') {
      user = await updateName(address as Address, name)
    } else if (iconUrl) {
      user = await updateIconUrl(address as Address, iconUrl)
    }
    revalidatePath('/')

    return user
  } catch (e) {
    console.error(e)
    if (e instanceof ZodError) {
      return { error: e.issues[0].message }
    }
    return { error: 'Internal server error' }
  }
}
