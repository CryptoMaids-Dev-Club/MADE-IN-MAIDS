import { useCallback, useEffect, useState } from 'react'
import { useAccount, useReadContracts, useWaitForTransactionReceipt } from 'wagmi'
import useMedalAndTicket from '@/app/[lang]/(features)/lottery/_hooks/useMedalAndTicket'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { maidsLotteryConfig, useWriteMaidsLotteryEntry, useWriteMaidsLotteryReturnTicket } from '@/lib/generated'

const useLottery = ({ lotteryId }: { lotteryId: number }) => {
  const [share, setShare] = useState<number>(1)

  const updateShare = useCallback((value: number) => {
    setShare(value)
  }, [])

  const { address } = useAccount()
  const { data, refetch } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: maidsLotteryConfig.address[NETWORK.id],
        abi: maidsLotteryConfig.abi,
        functionName: 'entryCountsByLotteryId',
        args: [BigInt(lotteryId), address ?? '0x'],
      },
      {
        address: maidsLotteryConfig.address[NETWORK.id],
        abi: maidsLotteryConfig.abi,
        functionName: 'isOngoingLatestLottery',
      },
    ],
  })
  const [entryCounts, isOngoing] = data || [0, false]

  // NOTE: `useSimulateContract` needs refetching after `setApprovedForAll` called.
  // It's complicated to handle, so use `useWriteContract` instead.
  const { data: hash, isPending, writeContract } = useWriteMaidsLotteryEntry()

  const {
    medalBalance,
    ticketBalance,
    isPending: isPendingApprove,
    approve,
    approved,
    refetch: refetchBalance,
  } = useMedalAndTicket()

  const {
    data: returnTicketHash,
    isPending: isPendingReturnTicket,
    writeContract: writeReturnTicket,
  } = useWriteMaidsLotteryReturnTicket()

  const { toast } = useToast()

  const entry = useCallback(() => {
    writeContract({
      args: [BigInt(share)],
    })
  }, [share, writeContract])

  const entryOrApprove = useCallback(() => {
    if (approved) {
      entry()
    } else {
      approve()
    }
  }, [approved, entry, approve])

  const returnTicket = useCallback(() => {
    writeReturnTicket({
      args: [BigInt(lotteryId)],
    })
  }, [lotteryId, writeReturnTicket])

  const { isLoading, status } = useWaitForTransactionReceipt({
    hash,
  })

  const { isLoading: isLoadingReturnTicket, status: statusReturnTicket } = useWaitForTransactionReceipt({
    hash: returnTicketHash,
  })

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Transaction Completed!',
        duration: 3000,
      })
      refetch()
      refetchBalance()
    }
  }, [status, toast, refetch, refetchBalance])

  useEffect(() => {
    if (statusReturnTicket === 'success') {
      toast({
        title: 'Transaction Completed!',
        duration: 3000,
      })
    }
  }, [statusReturnTicket, toast])

  const buttonMessage = () => {
    if (!isOngoing) {
      return 'Not ongoing'
    }
    if (isPending || isLoading || isPendingApprove) {
      return 'Loading...'
    }
    if (medalBalance === 0 || ticketBalance === 0) {
      return 'You need at least 1 Medal and 1 Ticket'
    }
    if (approved) {
      return 'Entry'
    }
    return 'Approve'
  }

  return {
    share,
    isPending: isPending || isLoading || isPendingApprove || isPendingReturnTicket || isLoadingReturnTicket,
    maxShare: Math.min(medalBalance, ticketBalance),
    entryCounts: Number(entryCounts),
    buttonMessage: buttonMessage(),
    disabled: medalBalance === 0 || ticketBalance === 0 || !isOngoing,
    updateShare,
    entryOrApprove,
    returnTicket,
  }
}

export default useLottery
