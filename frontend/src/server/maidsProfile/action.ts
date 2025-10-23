'use server'

import { revalidatePath } from 'next/cache'
import type { Address } from 'viem'
import * as v from 'valibot'
import prisma from '@/lib/prisma'
import { getNftOwner } from '@/server/nftOwner/query'
import { verifySignature } from '@/utils/signature'

const maidProfileUpdateSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  name: v.string(),
  character: v.string(),
  description: v.string(),
  imageUrl: v.pipe(v.string(), v.url()),
  address: v.string(),
  signature: v.string(),
})

type MaidProfileUpdateSchema = v.InferOutput<typeof maidProfileUpdateSchema>

export const updateMaidProfile = async (data: MaidProfileUpdateSchema) => {
  try {
    const result = v.parse(maidProfileUpdateSchema, data)
    const { id, name, character, description, imageUrl, address, signature } = result

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
    if (v.isValiError(e)) {
      return { error: e.issues[0].message }
    }
    return { error: 'Internal server error' }
  }
}
