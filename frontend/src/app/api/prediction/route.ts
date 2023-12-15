import { readContract, createConfig } from '@wagmi/core'
import { NextResponse } from 'next/server'
import { Prediction, SolidityPrediction } from '@/app/api/prediction/prediction'
import { NETWORK } from '@/config/server'
import { maidsPredictionABI, maidsPredictionAddress } from '@/lib/generated'
import { publicClient } from '@/lib/wagmicore'
import type { Address } from 'wagmi'

createConfig({ publicClient })

// convert from SolidityPrediction to Prediction
function convertToPredictions(data: SolidityPrediction[]) {
  const predictions = [] as Prediction[]
  data.forEach((value) => {
    const prediction = {
      id: Number(value.id),
      choicesLength: Number(value.choicesLength),
      predictionURI: value.predictionURI,
      rate: Number(value.rate),
      endTime: Number(value.endTime),
      result: Number(value.result),
      isSettled: value.isSettled,
    }
    predictions.push(prediction)
  })
  return predictions
}

export async function GET() {
  const data = await readContract({
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionABI,
    functionName: 'getAllPredictions',
  })

  return NextResponse.json(convertToPredictions(data as SolidityPrediction[]))
}

export const dynamic = 'force-dynamic'
