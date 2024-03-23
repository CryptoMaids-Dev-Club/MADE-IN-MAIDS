export type LotteryInfo = {
  lotteryId: number
  tokenId: number
  mexShares: number
  startTime: string
  endTime: string
  prizes: PrizeInfo[]
}

export type PrizeInfo = {
  prizeType: number
  contractAddress: string
  tokenId: number
  amount: number
  claimed: boolean
}
