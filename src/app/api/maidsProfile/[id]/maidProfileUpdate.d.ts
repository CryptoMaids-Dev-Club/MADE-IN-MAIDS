import { MaidProfile } from '@prisma/client'

export type MaidProfileUpdate = MaidProfile & {
  address: string
  signature: string
}
