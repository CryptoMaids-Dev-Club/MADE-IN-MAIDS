'use client'

import Typography from '@mui/material/Typography'
import { formatEther } from 'viem'
import { useAccount, useContractRead } from 'wagmi'
import { maidsPredictionContractConfig } from '@/config'
import type { Prediction, PredictionText } from '@/app/api/prediction/prediction'

type ResultProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const Result = ({ predictionInfo, predictionText }: ResultProps) => {
  const { address } = useAccount()

  const { data: rewardAmount } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getRewardAmount',
    args: [address, predictionInfo.id],
    cacheOnBlock: true,
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  const buttonMessage = () => {
    if (!predictionInfo.isSettled) {
      return 'Reward: Pending'
    } else if (rewardAmount === 0) {
      return 'No Hit'
    } else {
      return `Reward: ${rewardAmount ?? 0}`
    }
  }

  return (
    <>
      <Typography variant='h4'>Result</Typography>
      <Typography variant='body1'>
        Correct Answer: {predictionInfo.isSettled ? predictionText.choices[predictionInfo.result] : 'Pending'}
      </Typography>
      <Typography variant='body1' color='cyan'>
        {buttonMessage()}
      </Typography>
    </>
  )
}

export default Result
