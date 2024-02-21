import { useCallback, useEffect, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { parseEther } from 'viem'
import {
	useAccount,
	useWaitForTransactionReceipt,
	useWriteContract,
} from 'wagmi'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'
import { maidsVotingAddress, useSimulateMaidsVotingVote } from '@/lib/generated'

const useVote = (id: number) => {
	const { toast } = useToast()

	const { address } = useAccount()
	const [amount, setAmount] = useState(0)
	const debounceAmount = useDebounce(amount, 500)

	const { allowance, refetch } = useAllowance(
		address ?? `0x${''}`,
		maidsVotingAddress[NETWORK.id],
	)
	// const { isPending: isLoadingApprove, writeContract: approve } = useWriteMaidsTokenApprove()
	const { isPending: isLoadingApprove, approve } = useApprove(
		maidsVotingAddress[NETWORK.id],
	)

	const { data } = useSimulateMaidsVotingVote({
		args: [BigInt(id), parseEther(`${debounceAmount}`)],
	})
	const {
		data: writeData,
		isPending: isLoadingVote,
		writeContract: vote,
	} = useWriteContract()
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

	const updateAmount = useCallback((amount: number) => {
		setAmount(amount)
	}, [])

	const voteOrApprove = useCallback(() => {
		if (allowance && allowance > debounceAmount && data) {
			if (debounceAmount <= 0) return
			vote(data.request)
		} else {
			approve()
		}
	}, [allowance, approve, data, debounceAmount, vote])

	return {
		amount,
		updateAmount,
		voteOrApprove,
		isLoading: isLoadingApprove || isLoadingVote || isLoading,
		allowance,
	}
}

export default useVote
