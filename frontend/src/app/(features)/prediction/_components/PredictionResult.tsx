'use client'

import usePredictionResult from '@/app/(features)/prediction/_hooks/usePredictionResult'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Typography } from '@/components/ui/typography'
import type { Prediction, PredictionText } from '@/server/prediction/prediction'

type ResultProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const Result = ({ predictionInfo, predictionText }: ResultProps) => {
  const { userInfo, rewardAmount, claim, isLoading, buttonMessage, resultMessage } = usePredictionResult(predictionInfo)

  return (
    <>
      <Typography variant='h4'>
        Correct Answer: {predictionInfo.isSettled ? predictionText.choices[predictionInfo.result] : 'Pending'}
      </Typography>
      <Typography variant='h4' className='text-blue-300'>
        {resultMessage}
      </Typography>
      <LoadingButtonForWeb3
        className='w-full bg-blue-300 hover:bg-blue-300/80'
        onClick={() => claim()}
        loading={isLoading}
        disabled={!predictionInfo.isSettled || rewardAmount === 0 || userInfo?.isClaimed}>
        {buttonMessage}
      </LoadingButtonForWeb3>
    </>
  )
}

export default Result
