export type LotteryInfo = {
  tokenId: number
  maxShares: number
  totalShares: number
  startTime: number
  endTime: number
  ended: boolean
  winners: string[]
  prizes: PrizeInfo[]
}

export type PrizeInfo = {
  prizeName: string
  prizeImageUrl: string
}

export type SolidityLotteryInfo = {
  tokenId: bigint
  maxShares: bigint
  totalShares: bigint
  startTime: bigint
  endTime: bigint
  ended: boolean
  winners: string[]
  prizes: PrizeInfo[]
}

export type SolidityPrizeInfo = {
  prizeName: string
  prizeImageUrl: string
}
