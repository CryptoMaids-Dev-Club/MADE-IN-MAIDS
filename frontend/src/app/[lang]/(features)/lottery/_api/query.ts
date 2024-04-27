import { readContract } from '@wagmi/core'
import { unstable_noStore as noStore } from 'next/cache'
import { NETWORK } from '@/config/server'
import { maidsLotteryConfig } from '@/lib/generated'
import { wagmiConfig } from '@/lib/wagmicore'
import type { LotteryInfo, SolidityLotteryInfo } from '@/app/[lang]/(features)/lottery/_type'
import type { Address } from 'viem'
import 'server-only'

export const getLotteryInfo = async () => {
  noStore()
  const data = await readContract(wagmiConfig, {
    address: maidsLotteryConfig.address[NETWORK.id] as Address,
    abi: maidsLotteryConfig.abi,
    functionName: 'getAllLotteries',
  })

  const lotteries = convert(data as unknown as SolidityLotteryInfo[])

  if (lotteries.length === 0)
    return [
      {
        tokenId: 0,
        maxShares: 0,
        totalShares: 0,
        startTime: 0,
        endTime: 0,
        ended: false,
        winners: [],
        prizes: [],
      },
    ] as LotteryInfo[]

  return lotteries
}

const convert = (lotteries: SolidityLotteryInfo[]) => {
  noStore()
  const convertedLotteries: LotteryInfo[] = []
  lotteries.forEach((lottery) => {
    const convertedLottery: LotteryInfo = {
      tokenId: Number(lottery.tokenId),
      maxShares: Number(lottery.maxShares),
      totalShares: Number(lottery.totalShares),
      startTime: Number(lottery.startTime),
      endTime: Number(lottery.endTime),
      ended: lottery.ended,
      winners: lottery.winners,
      prizes: lottery.prizes.map((prize) => {
        return {
          prizeName: prize.prizeName,
          prizeImageUrl: prize.prizeImageUrl,
        }
      }),
    }
    convertedLotteries.push(convertedLottery)
  })

  return convertedLotteries
}
