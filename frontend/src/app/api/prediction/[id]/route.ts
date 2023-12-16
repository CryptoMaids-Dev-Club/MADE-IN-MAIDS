import { readContract, createConfig } from '@wagmi/core'
import { NextRequest, NextResponse } from 'next/server'
import { SolidityPrediction } from '@/app/api/prediction/prediction'
import { NETWORK } from '@/config/server'
import { maidsPredictionABI, maidsPredictionAddress } from '@/lib/generated'
import { publicClient } from '@/lib/wagmicore'
import type { Address } from 'wagmi'

createConfig({ publicClient })

// convert from SolidityPrediction to Prediction
function convertToPredictions(data: SolidityPrediction) {
  const prediction = {
    id: Number(data.id),
    choicesLength: Number(data.choicesLength),
    predictionURI: data.predictionURI,
    rate: Number(data.rate),
    endTime: Number(data.endTime),
    result: Number(data.result),
    isSettled: data.isSettled,
  }
  return prediction
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const data = await readContract({
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionABI,
    functionName: 'getPrediction',
    args: [BigInt(params.id)],
  })

  return NextResponse.json(convertToPredictions(data as SolidityPrediction))
}

export const dynamic = 'force-dynamic'
