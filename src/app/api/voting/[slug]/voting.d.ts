import type { AssetInfo } from '@/app/api/asset/[id]/asset'

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
