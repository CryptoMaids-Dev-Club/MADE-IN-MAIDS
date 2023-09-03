import { MaidProfile } from '@prisma/client'
import { MaidProfileUpdate } from './maidProfileUpdate'

export default async function updateMaidProfile({
  id,
  name,
  character,
  description,
  imageUrl,
  address,
  signature,
}: MaidProfileUpdate) {
  try {
    const lowerAddress = address.toLowerCase()
    const res = await fetch(`/api/maidsProfile/${id}`, {
      method: 'POST',
      body: JSON.stringify({ id, name, character, description, imageUrl, address: lowerAddress, signature }),
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const maidProfile = (await res.json()) as MaidProfile

    return maidProfile
  } catch (e) {
    console.error(e)

    throw new Error('Something went wrong!')
  }
}
