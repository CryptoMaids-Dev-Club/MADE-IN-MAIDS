import { useToast } from '@/components/hooks/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { maidsVotingAddress, useWriteMaidsVotingVote } from '@/lib/generated'
import { useCallback, useEffect } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'

const useVote = (id: number) => {
  const { toast } = useToast()

  const { address } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsVotingAddress[NETWORK.id])
  // const { isPending: isLoadingApprove, writeContract: approve } = useWriteMaidsTokenApprove()
  const { isPending: isLoadingApprove, approve } = useApprove(maidsVotingAddress[NETWORK.id])

  const { data: writeData, isPending: isLoadingVote, writeContract: vote } = useWriteMaidsVotingVote()
  const { isLoading, status } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Successfully voted!',
        description: 'Share your vote on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/detail/${id}`}
            title={`Voted for CryptoMaids #${id}!`}
            hashtags={['CryptoMaids']}
          >
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
      refetch()
    }
  }, [status, refetch, toast, id])

  const voteOrApprove = useCallback(
    (amount: number) => {
      if (allowance && allowance > amount) {
        if (amount <= 0) return
        vote({
          args: [BigInt(id), parseEther(`${amount}`)],
        })
      } else {
        approve()
      }
    },
    [allowance, approve, vote, id],
  )

  return {
    voteOrApprove,
    isLoading: isLoadingApprove || isLoadingVote || isLoading,
    allowance,
  }
}

export default useVote
