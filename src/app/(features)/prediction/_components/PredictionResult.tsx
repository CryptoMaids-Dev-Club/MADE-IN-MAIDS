'use client'

import usePredictionResult from '@/app/(features)/prediction/_hooks/usePredictionResult'
import { LoadingButton } from '@/components/ui/loading-button'
import { Typography } from '@/components/ui/typography'
import type { Prediction, PredictionText } from '@/app/api/prediction/prediction'

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
      <LoadingButton
        className='w-full bg-blue-300 hover:bg-blue-300/80'
        onClick={() => claim.write?.()}
        loading={isLoading}
        disabled={!predictionInfo.isSettled || rewardAmount === 0 || userInfo?.isClaimed}>
        {buttonMessage}
      </LoadingButton>
    </>
  )
}

export default Result
