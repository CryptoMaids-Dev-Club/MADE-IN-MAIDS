import { useCallback, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { useToast } from '@/components/ui/use-toast'
import { MAIDS_PREDICTION_CONTRACT_ADDRESS, maidsContractConfig, maidsPredictionContractConfig } from '@/config/client'
import useAllowance from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'
import type { SolidityUserInfo } from '@/app/api/prediction/prediction'

const usePredict = (predictionId: number) => {
  const { toast } = useToast()

  const [choice, setChoice] = useState(0)
  const [amount, setAmount] = useState(100)
  const debounceChoice = useDebounce(choice, 500)
  const debounceAmount = useDebounce(amount, 500)

  const { address, isConnected } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, MAIDS_PREDICTION_CONTRACT_ADDRESS)
  const { approve, approveTx } = useApprove(
    maidsContractConfig.address,
    address ?? `0x${''}`,
    MAIDS_PREDICTION_CONTRACT_ADDRESS
  )

  const { data: userInfo } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getUserInfo',
    args: [address, predictionId],
    cacheOnBlock: true,
    enabled: isConnected,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  const predictConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'predict',
    args: [predictionId, parseEther(`${debounceAmount}`), debounceChoice],
    enabled: Boolean(allowance) && Boolean(debounceAmount) && !userInfo?.isPredicted,
  }).config
  const predict = useContractWrite({ ...predictConfig })

  const predictTx = useWaitForTransaction({
    hash: predict.data?.hash,
    onSuccess() {
      toast({
        title: 'Successfully predicted!',
        description: 'Share your prediction on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://made-in-maids.vercel.app/detail/${predictionId}`}
            title={`Predicted for CryptoMaids #${predictionId}!`}
            hashtags={['CryptoMaids']}>
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
      refetch()
    },
  })

  const isLoading = approve.isLoading || predict.isLoading || approveTx.isLoading || predictTx.isLoading

  const canPredict = Boolean(allowance) && allowance >= debounceAmount

  const updateChoice = useCallback((choice: number) => {
    console.log('updateChoice: ', choice)
    setChoice(choice)
  }, [])

  const updateAmount = useCallback((amount: number) => {
    console.log('updateAmount: ', amount)
    setAmount(amount)
  }, [])

  const predictOrApprove = useCallback(() => {
    if (canPredict) {
      predict.write?.()
    } else {
      approve.write?.()
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
