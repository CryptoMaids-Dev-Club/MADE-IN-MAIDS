import { useCallback, useEffect, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { convertUserInfo } from '@/app/[lang]/(features)/prediction/utils'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import useAllowance from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'
import {
  maidsPredictionAddress,
  useReadMaidsPredictionGetUserInfo,
  useSimulateMaidsPredictionPredict,
} from '@/lib/generated'
import type { SolidityUserInfo } from '@/app/[lang]/(features)/prediction/_types'

const usePredict = (predictionId: number) => {
  const { toast } = useToast()

  const [choice, setChoice] = useState(0)
  const [amount, setAmount] = useState(100)
  const debounceChoice = useDebounce(choice, 500)
  const debounceAmount = useDebounce(amount, 500)

  const { address, isConnected } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsPredictionAddress[NETWORK.id])
  const { approve, isPending: isLoadingApprove } = useApprove(maidsPredictionAddress[NETWORK.id])

  const { data: userInfo } = useReadMaidsPredictionGetUserInfo({
    args: [address ?? '0x0', BigInt(predictionId)],
    query: {
      enabled: isConnected,
      select: (data) => convertUserInfo(data as SolidityUserInfo),
    },
  })

  const { data } = useSimulateMaidsPredictionPredict({
    args: [BigInt(predictionId), parseEther(`${debounceAmount}`), BigInt(debounceChoice)],
  })
  const { data: writeData, isPending: isLoadingPredict, writeContract: predict } = useWriteContract()
  const { isLoading, status } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Successfully predicted!',
        description: 'Share your prediction on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/detail/${predictionId}`}
            title={`Predicted for CryptoMaids #${predictionId}!`}
            hashtags={['CryptoMaids']}>
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
      refetch()
    }
  }, [status, refetch, toast, predictionId])

  const canPredict = Boolean(allowance) && allowance >= debounceAmount

  const updateChoice = useCallback((choice: number) => {
    setChoice(choice)
  }, [])

  const updateAmount = useCallback((amount: number) => {
    setAmount(amount)
  }, [])

  const predictOrApprove = useCallback(() => {
    if (canPredict && data) {
      predict(data.request)
    } else {
      approve()
    }
  }, [approve, canPredict, data, predict])

  const buttonMessage = useCallback(() => {
    if (userInfo?.isPredicted) {
      return 'Already Predicted'
    } else if (canPredict) {
      return 'Vote'
    } else {
      return 'Approve $MAIDS'
    }
  }, [canPredict, userInfo])

  return {
    userInfo,
    allowance,
    isLoading: isLoadingApprove || isLoadingPredict || isLoading,
    canPredict,
    isPredicted: userInfo?.isPredicted ?? false,
    buttonMessage: buttonMessage(),
    choice,
    amount,
    predictOrApprove,
    refetch,
    updateChoice,
    updateAmount,
  }
}

export default usePredict
