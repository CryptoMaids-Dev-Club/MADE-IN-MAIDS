import { useCallback } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { formatEther } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { useToast } from '@/components/ui/use-toast'
import {
  useMaidsPredictionClaimReward,
  useMaidsPredictionGetRewardAmount,
  useMaidsPredictionGetUserInfo,
} from '@/lib/generated'
import type { Prediction, SolidityUserInfo } from '@/server/prediction/prediction'

const usePredictionResult = (predictionInfo: Prediction) => {
  const { toast } = useToast()
  const { address, isConnected } = useAccount()

  const {
    data: claimData,
    isLoading: isLoadingClaim,
    write: claim,
  } = useMaidsPredictionClaimReward({
    args: [BigInt(predictionInfo.id)],
  })

  const claimTx = useWaitForTransaction({
    hash: claimData?.hash,
    onSuccess() {
      toast({
        title: `You have claimed ${rewardAmount} $MAIDS!`,
        description: 'Share your claim on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/detail/${predictionInfo.id}`}
            title={`Claimed ${rewardAmount} $MAIDS!`}
            hashtags={['CryptoMaids']}>
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
    },
  })

  const { data: rewardAmount } = useMaidsPredictionGetRewardAmount({
    args: [address ?? '0x0', BigInt(predictionInfo.id)],
    enabled: address && isConnected,
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  const { data: userInfo } = useMaidsPredictionGetUserInfo({
    args: [address ?? '0x0', BigInt(predictionInfo.id)],
    enabled: address && isConnected,
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

  const isLoading = isLoadingClaim || claimTx.isLoading

  return {
    userInfo,
    rewardAmount,
    isLoading,
    claim,
    claimTx,
    buttonMessage: buttonMessage(),
    resultMessage: resultMessage(),
  }
}

export default usePredictionResult
