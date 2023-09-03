'use server'

import { prisma } from '@/lib/prisma'
import { CHAINBASE_API_KEY } from '@/config'
import { recoverMessageAddress } from 'viem'
import type { MaidProfileUpdate } from './maidProfileUpdate'

export default async function updateMaidProfile({
  id,
  name,
  character,
  description,
  imageUrl,
  address,
  signature,
}: MaidProfileUpdate) {
  const lowerAddress = address.toLowerCase()
  const recoveredAddress = await recoverMessageAddress({
    message: 'Update Profile',
    signature: signature as `0x{string}`,
  })

  if (recoveredAddress.toLowerCase() !== lowerAddress) return { error: 'Invalid signature' }

  const res = await fetch(
    `https://api.chainbase.online/v1/nft/owner?chain_id=1&contract_address=0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7&token_id=${id}`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const owner = (await res.json()).data as string

  if (owner.toLowerCase() !== lowerAddress) return { error: 'Invalid address' }

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

  return maidProfile
}
