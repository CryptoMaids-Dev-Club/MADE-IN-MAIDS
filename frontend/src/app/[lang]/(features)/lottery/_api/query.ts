import { readContract } from '@wagmi/core'
import { unstable_noStore as noStore } from 'next/cache'
import { NETWORK } from '@/config/server'
import { maidsLotteryConfig } from '@/lib/generated'
import { wagmiConfig } from '@/lib/wagmicore'
import type { LotteryInfo, SolidityLotteryInfo } from '@/app/[lang]/(features)/lottery/_type'
import type { Address } from 'viem'
import 'server-only'

const oldLotteryInfo = {
  medalTokenId: 0,
  ticketTokenId: 5,
  maxShares: 300,
  totalShares: 12,
  startTime: 0,
  endTime: 1717038000,
  ended: true,
  winners: [
    '0xF15f58195A4F646C66363eA8bFc30BbBa450DE1A',
    '0x1a78Ce6Ad347e4ae2DfC03FAfF6981a2E82a4200',
    '0xE78AB91f0e7FD82d35e5e250Da2924363F205233',
    '0xde38c6964f840afeEB6D891cb4F6B132498579AE',
    '0xE78AB91f0e7FD82d35e5e250Da2924363F205233',
  ],
  prizes: [
    {
      prizeName: 'CryptoMaids Limited NFT "Ohayo Chan"',
      prizeImageUrl: 'https://made-in-maids.s3.amazonaws.com/lottery/may/ohayo.jpeg',
    },
    {
      prizeName: 'Doujin Artist FanArt "[Flower Language x CryptoMaids] Neo Corner Jr." by Doujin Artist Sumiidare san',
      prizeImageUrl: 'https://made-in-maids.s3.amazonaws.com/lottery/may/Sumiidare.jpeg',
    },
    {
      prizeName: "CourtYard's Tokenized Pokemon Card (Digital) 1999 Jungle #60 Pikachu (PSA 8 NM-MT)",
      prizeImageUrl: 'https://made-in-maids.s3.amazonaws.com/lottery/may/pokemon1.jpg',
    },
    {
      prizeName: "CourtYard's Tokenized Pokemon Card (Digital) 2000 Black Star Promos #8 Mew (PSA 8 NM-MT)",
      prizeImageUrl: 'https://made-in-maids.s3.amazonaws.com/lottery/may/pokemon2.jpg',
    },
    {
      prizeName: '30.00 USDC (Polygon Network)',
      prizeImageUrl: 'https://made-in-maids.s3.amazonaws.com/lottery/may/usdc.png',
    },
  ],
}

export const getLotteryInfo = async () => {
  noStore()
  const data = await readContract(wagmiConfig, {
    address: maidsLotteryConfig.address[NETWORK.id] as Address,
    abi: maidsLotteryConfig.abi,
    functionName: 'getAllLotteries',
  })

  const lotteries = convert(data as SolidityLotteryInfo[])

  lotteries.unshift(oldLotteryInfo as unknown as LotteryInfo) // Add old lottery info

  if (lotteries.length === 0)
    return [
      {
        medalTokenId: 0,
        ticketTokenId: 0,
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
      medalTokenId: Number(lottery.medalTokenId),
      ticketTokenId: Number(lottery.ticketTokenId),
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
