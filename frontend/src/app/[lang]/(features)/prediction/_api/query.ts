import { readContract } from '@wagmi/core'
import { type Address, formatEther } from 'viem'
import { NETWORK } from '@/config/server'
import { maidsPredictionAbi, maidsPredictionAddress } from '@/lib/generated'
import { wagmiConfig } from '@/lib/wagmicore'
import type { SolidityTopUserInfo, TopUserInfo } from '../_types'
import type { Prediction, SolidityPrediction } from '../_types'
import 'server-only'

export const getAllPredictions = async () => {
  const data = await readContract(wagmiConfig, {
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionAbi,
    functionName: 'getAllPredictions',
  })

  return convertToPredictions(data as SolidityPrediction[])
}

export const getPrediction = async (id: number) => {
  const data = await readContract(wagmiConfig, {
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionAbi,
    functionName: 'getPrediction',
    args: [BigInt(id)],
  })
  return convertToPrediction(data as SolidityPrediction)
}

export const getTopUserInfo = async () => {
  const data = await readContract(wagmiConfig, {
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionAbi,
    functionName: 'getTop3Info',
  })

  return convertToTopUserInfo(data as unknown as SolidityTopUserInfo[])
}

// convert from SolidityPrediction to Prediction
function convertToPredictions(data: SolidityPrediction[]) {
  const predictions = [] as Prediction[]
  data.forEach((value) => {
    const prediction = convertToPrediction(value)
    predictions.push(prediction)
  })
  return predictions
}

// convert from SolidityPrediction to Prediction
function convertToPrediction(data: SolidityPrediction) {
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
