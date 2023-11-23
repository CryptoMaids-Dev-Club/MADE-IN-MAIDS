import { useCallback, useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { MAIDS_VOTING_CONTRACT_ADDRESS, maidsContractConfig, votingContractConfig } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useDebounce } from '@/hooks/useDebounce'

const useVote = (id: number) => {
  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

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
    Snackbar,
    openSnackbar,
  }
}

export default useVote
