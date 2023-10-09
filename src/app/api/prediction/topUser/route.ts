import { createConfig, readContract } from '@wagmi/core'
import { NextResponse } from 'next/server'
import { formatEther } from 'viem'
import { SolidityTopUserInfo, TopUserInfo } from '@/app/api/prediction/prediction'
import { maidsPredictionContractConfig } from '@/config'
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
    ...maidsPredictionContractConfig,
    functionName: 'getTop3Info',
  })

  return NextResponse.json(convertToTopUserInfo(data as SolidityTopUserInfo[]))
}

export const dynamic = 'force-dynamic'
