'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import usePredictionResult from '@/app/(features)/prediction/_hooks/usePredictionResult'
import type { Prediction, PredictionText } from '@/app/api/prediction/prediction'

type ResultProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const Result = ({ predictionInfo, predictionText }: ResultProps) => {
  const { userInfo, rewardAmount, claim, isLoading, buttonMessage, resultMessage, Snackbar } =
    usePredictionResult(predictionInfo)

  return (
    <>
      <Typography variant='body1'>
        Correct Answer: {predictionInfo.isSettled ? predictionText.choices[predictionInfo.result] : 'Pending'}
      </Typography>
      <Typography variant='body1' color='cyan'>
        {resultMessage}
      </Typography>
      <LoadingButton
        variant='contained'
        onClick={() => claim.write?.()}
        loading={isLoading}
        disabled={!predictionInfo.isSettled || rewardAmount === 0 || userInfo?.isClaimed}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        {buttonMessage}
      </LoadingButton>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
        You have claimed {rewardAmount} $MAIDS!
      </Snackbar>
    </>
  )
}

export default Result
