'use server'

import { revalidatePath } from 'next/cache'
import { Address } from 'viem'
import prisma from '@/lib/prisma'
import { MaidProfileUpdateSchema } from '@/server/maidsProfile'
import { getNftOwner } from '@/server/nftOwner/query'
import { verifySignature } from '@/utils/signature'

export const updateMaidProfile = async ({
  id,
  name,
  character,
  description,
  imageUrl,
  address,
  signature,
}: MaidProfileUpdateSchema) => {
  const lowerAddress = address.toLowerCase() as Address

  if ((await verifySignature(lowerAddress, 'Update Profile', signature as Address)) === false)
    return { error: 'Invalid signature' }

  const ownerAddress = await getNftOwner(id)

  if (ownerAddress.toLowerCase() !== lowerAddress) return { error: 'Invalid address' }

  const maidProfile = await prisma.maidProfile.upsert({
    where: {
      id: Number(id),
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

  revalidatePath(`/detail/${id}`)

  return maidProfile
}
