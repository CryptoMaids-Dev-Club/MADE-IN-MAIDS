import type { Prediction, SolidityUserInfo } from '@/app/[lang]/(features)/prediction/_types'
import { convertUserInfo } from '@/app/[lang]/(features)/prediction/utils'
import { useToast } from '@/components/hooks/use-toast'
import {
  useReadMaidsPredictionGetRewardAmount,
  useReadMaidsPredictionGetUserInfo,
  useSimulateMaidsPredictionClaimReward,
} from '@/lib/generated'
import { useCallback, useEffect } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { formatEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

const usePredictionResult = (predictionInfo: Prediction) => {
  const { toast } = useToast()
  const { address, isConnected } = useAccount()

  const { data: rewardAmount } = useReadMaidsPredictionGetRewardAmount({
    args: [address ?? '0x0', BigInt(predictionInfo.id)],
    query: {
      enabled: address && isConnected,
      select: (data) => Math.floor(Number(formatEther(data as bigint))),
    },
  })

  const { data: userInfo } = useReadMaidsPredictionGetUserInfo({
    args: [address ?? '0x0', BigInt(predictionInfo.id)],
    query: {
      enabled: address && isConnected,
      select: (data) => convertUserInfo(data as SolidityUserInfo),
    },
  })

  const { data } = useSimulateMaidsPredictionClaimReward({
    args: [BigInt(predictionInfo.id)],
  })
  const { data: writeData, isPending: isLoadingClaim, writeContract: claim } = useWriteContract()
  const { isLoading, status } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: `You have claimed ${rewardAmount ?? 0} $MAIDS!`,
        description: 'Share your claim on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/detail/${predictionInfo.id}`}
            title={`Claimed ${rewardAmount} $MAIDS!`}
            hashtags={['CryptoMaids']}
          >
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
    }
  }, [status, rewardAmount, toast, predictionInfo.id])

  const buttonMessage = useCallback(() => {
    if (userInfo?.isClaimed) {
      return 'Already Claimed'
    }
    if (!predictionInfo.isSettled) {
      return 'Pending'
    }
    if (rewardAmount === 0) {
      return 'No Hit'
    }
    return 'Claim Reward'
  }, [predictionInfo.isSettled, rewardAmount, userInfo?.isClaimed])

  const resultMessage = useCallback(() => {
    if (!predictionInfo.isSettled) {
      return 'Reward: Pending'
    }
    if (rewardAmount === 0) {
      return 'No Hit'
    }
    return `Reward: ${rewardAmount ?? 0}`
  }, [predictionInfo.isSettled, rewardAmount])

  return {
    userInfo,
    rewardAmount,
    isLoading: isLoading || isLoadingClaim,
    claim: () => (data ? claim(data.request) : {}),
    buttonMessage: buttonMessage(),
    resultMessage: resultMessage(),
  }
}

export default usePredictionResult
