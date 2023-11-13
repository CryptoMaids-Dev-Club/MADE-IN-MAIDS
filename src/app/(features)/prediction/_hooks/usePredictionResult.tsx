import { useCallback } from 'react'
import { formatEther } from 'viem'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { maidsPredictionContractConfig } from '@/config/client'
import type { Prediction, SolidityUserInfo } from '@/app/api/prediction/prediction'

const usePredictionResult = (predictionInfo: Prediction) => {
  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  const { address, isConnected } = useAccount()

  const claimConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'claimReward',
    args: [predictionInfo.id],
    enabled: predictionInfo.isSettled && isConnected,
  }).config
  const claim = useContractWrite({ ...claimConfig })
  const claimTx = useWaitForTransaction({
    hash: claim.data?.hash,
    onSuccess() {
      openSnackbar()
    },
  })

  const { data: rewardAmount } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getRewardAmount',
    args: [address, predictionInfo.id],
    cacheOnBlock: true,
    enabled: isConnected,
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  const { data: userInfo } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getUserInfo',
    args: [address, predictionInfo.id],
    cacheOnBlock: true,
    enabled: isConnected,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  const buttonMessage = useCallback(() => {
    if (userInfo?.isClaimed) {
      return 'Already Claimed'
    } else if (!predictionInfo.isSettled) {
      return 'Pending'
    } else if (rewardAmount === 0) {
      return 'No Hit'
    } else {
      return 'Claim Reward'
    }
  }, [predictionInfo.isSettled, rewardAmount, userInfo?.isClaimed])

  const resultMessage = useCallback(() => {
    if (!predictionInfo.isSettled) {
      return 'Reward: Pending'
    } else if (rewardAmount === 0) {
      return 'No Hit'
    } else {
      return `Reward: ${rewardAmount ?? 0}`
    }
  }, [predictionInfo.isSettled, rewardAmount])

  const isLoading = claim.isLoading || claimTx.isLoading

  return {
    userInfo,
    rewardAmount,
    isLoading,
    claim,
    claimTx,
    buttonMessage: buttonMessage(),
    resultMessage: resultMessage(),
    Snackbar,
  }
}

export default usePredictionResult
