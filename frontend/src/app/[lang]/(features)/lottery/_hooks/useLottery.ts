import { useCallback, useEffect, useState } from 'react'
import { useAccount, useReadContracts, useWaitForTransactionReceipt } from 'wagmi'
import useMedalAndTicket from '@/app/[lang]/(features)/lottery/_hooks/useMedalAndTicket'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import {
  maidsLotteryConfig,
  maidsLotteryOldConfig,
  useWriteMaidsLotteryEntry,
  useWriteMaidsLotteryOldReturnTicket,
  useWriteMaidsLotteryReturnTicket,
} from '@/lib/generated'

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
        args: [BigInt(lotteryId - 1), address ?? '0x'],
      },
      {
        address: maidsLotteryConfig.address[NETWORK.id],
        abi: maidsLotteryConfig.abi,
        functionName: 'isOngoingLatestLottery',
      },
      {
        address: maidsLotteryOldConfig.address[NETWORK.id],
        abi: maidsLotteryOldConfig.abi,
        functionName: 'entryCountsByLotteryId',
        args: [0n, address ?? '0x'],
      },
    ],
  })
  const [entryCounts, isOngoing, entryCountsOld] = data || [0, false, 0]

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

  const {
    data: returnTicketHashOld,
    isPending: isPendingReturnTicketOld,
    writeContract: writeReturnTicketOld,
  } = useWriteMaidsLotteryOldReturnTicket()

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
    if (lotteryId === 0) {
      writeReturnTicketOld({
        args: [BigInt(lotteryId)],
      })
    } else {
      writeReturnTicket({
        args: [BigInt(lotteryId - 1)],
      })
    }
  }, [lotteryId, writeReturnTicket, writeReturnTicketOld])

  const { isLoading, status } = useWaitForTransactionReceipt({
    hash,
  })

  const { isLoading: isLoadingReturnTicket, status: statusReturnTicket } = useWaitForTransactionReceipt({
    hash: returnTicketHash,
  })

  const { isLoading: isLoadingReturnTicketOld, status: statusReturnTicketOld } = useWaitForTransactionReceipt({
    hash: returnTicketHashOld,
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

  useEffect(() => {
    if (statusReturnTicketOld === 'success') {
      toast({
        title: 'Transaction Completed!',
        duration: 3000,
      })
    }
  }, [statusReturnTicketOld, toast])

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
    isPending:
      isPending ||
      isLoading ||
      isPendingApprove ||
      isPendingReturnTicket ||
      isLoadingReturnTicket ||
      isPendingReturnTicketOld ||
      isLoadingReturnTicketOld,
    maxShare: Math.min(medalBalance, ticketBalance),
    entryCounts: lotteryId === 0 ? entryCountsOld : Number(entryCounts),
    buttonMessage: buttonMessage(),
    disabled: medalBalance === 0 || ticketBalance === 0 || !isOngoing,
    updateShare,
    entryOrApprove,
    returnTicket,
  }
}

export default useLottery
