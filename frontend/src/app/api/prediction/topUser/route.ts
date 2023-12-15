import { createConfig, readContract } from '@wagmi/core'
import { NextResponse } from 'next/server'
import { Address, formatEther } from 'viem'
import { SolidityTopUserInfo, TopUserInfo } from '@/app/api/prediction/prediction'
import { NETWORK } from '@/config/server'
import { maidsPredictionABI, maidsPredictionAddress } from '@/lib/generated'
import { publicClient } from '@/lib/wagmicore'

createConfig({ publicClient })

// convert from SolidityTopUserInfo to TopUserInfo
function convertToTopUserInfo(data: SolidityTopUserInfo[]) {
  const topUserInfos = [] as TopUserInfo[]
  data.forEach((value) => {
    const topUserInfo = {
      user: value.user,
      amount: Math.floor(Number(formatEther(value.amount))),
    }
    topUserInfos.push(topUserInfo)
  })
  return topUserInfos
}

export async function GET() {
  const data = await readContract({
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionABI,
    functionName: 'getTop3Info',
  })

  return NextResponse.json(convertToTopUserInfo(data as unknown as SolidityTopUserInfo[]))
}

export const dynamic = 'force-dynamic'
