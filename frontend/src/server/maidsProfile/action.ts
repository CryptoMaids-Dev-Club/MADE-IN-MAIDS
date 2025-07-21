'use server'

import { revalidatePath } from 'next/cache'
import type { Address } from 'viem'
import { ZodError, z } from 'zod'
import prisma from '@/lib/prisma'
import { getNftOwner } from '@/server/nftOwner/query'
import { verifySignature } from '@/utils/signature'
import { MaidProfileSchema } from 'prisma/generated/zod'

const maidProfileUpdateSchema = MaidProfileSchema.merge(
  z.object({
    imageUrl: z.string(),
    address: z.string(),
    signature: z.string(),
  }),
)

type MaidProfileUpdateSchema = z.infer<typeof maidProfileUpdateSchema>

export const updateMaidProfile = async (data: MaidProfileUpdateSchema) => {
  try {
    const { id, name, character, description, imageUrl, address, signature } = maidProfileUpdateSchema.parse(data)

    const lowerAddress = address.toLowerCase() as Address

    const verify = await verifySignature(lowerAddress, 'Update Profile', signature as Address)
    if (!verify) return { error: 'Invalid signature' }

    const ownerAddress = await getNftOwner(id)
    if (ownerAddress.toLowerCase() !== lowerAddress) return { error: 'Invalid address' }

    const maidProfile = await prisma.maidProfile.upsert({
      where: {
        id,
      },
      update: {
        name,
        character,
        description,
        imageUrl,
      },
      create: {
        id: Number(id),
        name,
        character,
        description,
        imageUrl,
      },
    })

    revalidatePath('/')

    return maidProfile
  } catch (e) {
    console.error(e)
    if (e instanceof ZodError) {
      return { error: e.issues[0].message }
    }
    return { error: 'Internal server error' }
  }
}
