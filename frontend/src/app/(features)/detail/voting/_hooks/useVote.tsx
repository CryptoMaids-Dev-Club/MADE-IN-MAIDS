import { useCallback, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'
import { maidsVotingAddress, useMaidsVotingVote } from '@/lib/generated'

const useVote = (id: number) => {
  const { toast } = useToast()

  const { address } = useAccount()
  const [amount, setAmount] = useState(0)
  const debounceAmount = useDebounce(amount, 500)

  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsVotingAddress[NETWORK.id])
  const { approve, isLoading: isLoadingApprove, approveTx } = useApprove(maidsVotingAddress[NETWORK.id])

  const {
    data: votingData,
    isLoading: isLoadingVote,
    write: vote,
  } = useMaidsVotingVote({
    args: debounceAmount ? [BigInt(id), parseEther(`${Number(debounceAmount)}`)] : [BigInt(id), 0n],
  })

  const voteTx = useWaitForTransaction({
    hash: votingData?.hash,
    onSuccess() {
      toast({
        title: 'Successfully voted!',
        description: 'Share your vote on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/detail/${id}`}
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
    if (allowance && allowance > Number(debounceAmount)) {
      if (Number(debounceAmount) <= 0) return
      vote()
    } else {
      approve()
    }
  }, [allowance, approve, debounceAmount, vote])

  return {
    amount,
    updateAmount,
    voteOrApprove,
    isLoading: isLoadingApprove || isLoadingVote || approveTx.isLoading || voteTx.isLoading,
    allowance,
  }
}

export default useVote
