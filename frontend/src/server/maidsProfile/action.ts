'use server'

import { revalidatePath } from 'next/cache'
import { recoverMessageAddress } from 'viem'
import prisma from '@/lib/prisma'
import { MaidProfileUpdateSchema } from '@/server/maidsProfile'
import { getNftOwner } from '@/server/nftOwner/query'

export const updateMaidProfile = async ({
  id,
  name,
  character,
  description,
  imageUrl,
  address,
  signature,
}: MaidProfileUpdateSchema) => {
  const lowerAddress = address.toLowerCase()
  const recoveredAddress = await recoverMessageAddress({
    message: 'Update Profile',
    signature: signature as `0x{string}`,
  })

  if (recoveredAddress.toLowerCase() !== lowerAddress) return { error: 'Invalid signature' }

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
