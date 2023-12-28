import { readContract, createConfig } from '@wagmi/core'
import { Address, formatEther } from 'viem'
import { NETWORK } from '@/config/server'
import { maidsPredictionABI, maidsPredictionAddress } from '@/lib/generated'
import { publicClient } from '@/lib/wagmicore'
import { SolidityTopUserInfo, TopUserInfo } from './prediction'
import { Prediction, SolidityPrediction } from './prediction'
import 'server-only'

createConfig({ publicClient })

export const getAllPredictions = async () => {
  const data = await readContract({
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionABI,
    functionName: 'getAllPredictions',
  })

  return convertToPredictions(data as SolidityPrediction[])
}

export const getPrediction = async (id: number) => {
  const data = await readContract({
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionABI,
    functionName: 'getPrediction',
    args: [BigInt(id)],
  })
  return convertToPrediction(data as SolidityPrediction)
}

export const getTopUserInfo = async () => {
  const data = await readContract({
    address: maidsPredictionAddress[NETWORK.id] as Address,
    abi: maidsPredictionABI,
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
