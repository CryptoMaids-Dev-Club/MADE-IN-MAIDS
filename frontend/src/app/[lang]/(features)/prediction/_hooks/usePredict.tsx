import type { SolidityUserInfo } from '@/app/[lang]/(features)/prediction/_types'
import { convertUserInfo } from '@/app/[lang]/(features)/prediction/utils'
import { useToast } from '@/components/hooks/use-toast'
import { NETWORK } from '@/config/client'
import useAllowance from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'
import {
  maidsPredictionAddress,
  useReadMaidsPredictionGetUserInfo,
  useWriteMaidsPredictionPredict,
} from '@/lib/generated'
import { useCallback, useEffect, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'

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

  const { data: writeData, isPending: isLoadingPredict, writeContract: predict } = useWriteMaidsPredictionPredict()
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
            hashtags={['CryptoMaids']}
          >
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
    if (canPredict) {
      predict({
        args: [BigInt(predictionId), parseEther(`${debounceAmount}`), BigInt(debounceChoice)],
      })
    } else {
      approve()
    }
  }, [approve, canPredict, predict, debounceAmount, debounceChoice, predictionId])

  const buttonMessage = useCallback(() => {
    if (userInfo?.isPredicted) {
      return 'Already Predicted'
    }
    if (canPredict) {
      return 'Vote'
    }
    return 'Approve $MAIDS'
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
