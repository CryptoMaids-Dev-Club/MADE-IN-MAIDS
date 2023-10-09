import { readContract, configureChains, createConfig } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { NextRequest, NextResponse } from 'next/server'
import { SolidityPrediction } from '@/app/api/prediction/prediction'
import { maidsPredictionContractConfig } from '@/config'

const { publicClient } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
)

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
    ...maidsPredictionContractConfig,
    functionName: 'getPrediction',
    args: [params.id],
  })

  return NextResponse.json(convertToPredictions(data as SolidityPrediction))
}

export const revalidate = 60 // 1 minute
