import type { Address } from 'viem'

export type ChainbaseResponse = {
  code: number
  message: string
  data: Address
}
