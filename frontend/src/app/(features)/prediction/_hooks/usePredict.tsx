import { useCallback, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import useAllowance from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'
import { maidsPredictionAddress, useMaidsPredictionGetUserInfo, useMaidsPredictionPredict } from '@/lib/generated'
import type { SolidityUserInfo } from '@/app/(features)/prediction/_types'

const usePredict = (predictionId: number) => {
  const { toast } = useToast()

  const [choice, setChoice] = useState(0)
  const [amount, setAmount] = useState(100)
  const debounceChoice = useDebounce(choice, 500)
  const debounceAmount = useDebounce(amount, 500)

  const { address, isConnected } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsPredictionAddress[NETWORK.id])
  const { approve, isLoading: isLoadingApprove, approveTx } = useApprove(maidsPredictionAddress[NETWORK.id])

  const { data: userInfo } = useMaidsPredictionGetUserInfo({
    args: [address ?? '0x0', BigInt(predictionId)],
    enabled: isConnected,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  const {
    data: predictData,
    isLoading: isLoadingPredict,
    write: predict,
  } = useMaidsPredictionPredict({
    args: [BigInt(predictionId), parseEther(`${debounceAmount}`), BigInt(debounceChoice)],
  })

  const predictTx = useWaitForTransaction({
    hash: predictData?.hash,
    onSuccess() {
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
    },
  })

  const isLoading = isLoadingApprove || isLoadingPredict || approveTx.isLoading || predictTx.isLoading

  const canPredict = Boolean(allowance) && allowance >= debounceAmount

  const updateChoice = useCallback((choice: number) => {
    setChoice(choice)
  }, [])

  const updateAmount = useCallback((amount: number) => {
    setAmount(amount)
  }, [])

  const predictOrApprove = useCallback(() => {
    if (canPredict) {
      predict()
    } else {
      approve()
    }
  }, [approve, canPredict, predict])

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
    isLoading,
    canPredict,
    isPredicted: userInfo?.isPredicted,
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
