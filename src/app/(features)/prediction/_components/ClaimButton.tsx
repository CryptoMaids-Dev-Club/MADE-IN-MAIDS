'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { maidsPredictionContractConfig } from '@/config/client'
import type { Prediction, SolidityUserInfo } from '@/app/api/prediction/prediction'

type ClaimButtonProps = {
  predictionInfo: Prediction
}

const ClaimButton = ({ predictionInfo }: ClaimButtonProps) => {
  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  const claimConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'claimReward',
    args: [predictionInfo.id],
    enabled: predictionInfo.isSettled,
  }).config
  const claim = useContractWrite({ ...claimConfig })
  const claimTx = useWaitForTransaction({
    hash: claim.data?.hash,
    onSuccess() {
      openSnackbar()
    },
  })

  const { address } = useAccount()

  const { data: rewardAmount } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getRewardAmount',
    args: [address, predictionInfo.id],
    cacheOnBlock: true,
    select: (data) => Number(data),
  })

  const { data: userInfo } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getUserInfo',
    args: [address, predictionInfo.id],
    cacheOnBlock: true,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  const buttonMessage = () => {
    if (userInfo?.isClaimed) {
      return 'Already Claimed'
    } else if (!predictionInfo.isSettled) {
      return 'Pending'
    } else if (rewardAmount === 0) {
      return 'No Hit'
    } else {
      return 'Claim Reward'
    }
  }

  return (
    <>
      <LoadingButton
        variant='contained'
        onClick={() => claim.write?.()}
        loading={claim.isLoading || claimTx.isLoading}
        disabled={predictionInfo.isSettled || rewardAmount === 0}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        {buttonMessage()}
      </LoadingButton>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
        You have claimed {rewardAmount} $MAIDS!
      </Snackbar>
    </>
  )
}

export default ClaimButton
