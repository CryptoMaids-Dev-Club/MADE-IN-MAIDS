import { MaidProfile } from '@prisma/client'

export type MaidProfileUpdate = MaidProfile & {
  imageUrl: string
  address: string
  signature: string
}
