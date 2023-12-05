import { useCallback, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useToast } from '@/components/ui/use-toast'
import { MAIDS_VOTING_CONTRACT_ADDRESS, maidsContractConfig, votingContractConfig } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'

const useVote = (id: number) => {
  const { toast } = useToast()

  const { address } = useAccount()
  const [amount, setAmount] = useState(0)
  const debounceAmount = useDebounce(amount, 500)

  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, MAIDS_VOTING_CONTRACT_ADDRESS)
  const { approve, approveTx } = useApprove(
    maidsContractConfig.address,
    address ?? `0x${''}`,
    MAIDS_VOTING_CONTRACT_ADDRESS
  )

  const votingConfig = usePrepareContractWrite({
    ...votingContractConfig,
    functionName: 'vote',
    args: debounceAmount ? [id, parseEther(`${Number(debounceAmount)}`)] : [id, 0],
    enabled: Boolean(allowance) && Boolean(debounceAmount),
  }).config
  const vote = useContractWrite({ ...votingConfig })

  const voteTx = useWaitForTransaction({
    hash: vote.data?.hash,
    onSuccess() {
      toast({
        title: 'Successfully voted!',
        description: 'Share your vote on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://made-in-maids.vercel.app/detail/${id}`}
            title={`Voted for CryptoMaids #${id}!`}
            hashtags={['CryptoMaids']}>
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
      refetch()
    },
  })

  const updateAmount = useCallback((amount: number) => {
    setAmount(amount)
  }, [])

  const voteOrApprove = useCallback(() => {
    try {
      if (allowance && allowance > Number(debounceAmount)) {
        if (Number(debounceAmount) <= 0) return
        vote.write?.()
      } else {
        approve.write?.()
      }
    } catch (e) {
      console.error(e)
    }
  }, [allowance, approve, debounceAmount, vote])

  return {
    amount,
    updateAmount,
    voteOrApprove,
    isLoading: approve.isLoading || vote.isLoading || approveTx.isLoading || voteTx.isLoading,
    allowance,
  }
}

export default useVote
