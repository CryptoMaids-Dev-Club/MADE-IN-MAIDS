import type { AssetInfo } from '@/server/asset'

export type SolidityVote = {
  id: bigint
  amount: bigint
}

export type Vote = {
  id: number
  amount: number
}

export type TopAsset = AssetInfo &
  Vote & {
    rank: number
  }
