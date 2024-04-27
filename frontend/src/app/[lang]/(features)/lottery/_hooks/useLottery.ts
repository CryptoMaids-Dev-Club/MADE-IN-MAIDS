import { useCallback, useEffect, useState } from 'react'
import { useAccount, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useMedalAndTicket from '@/app/[lang]/(features)/lottery/_hooks/useMedalAndTicket'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { maidsLotteryConfig, useSimulateMaidsLotteryEntry } from '@/lib/generated'

const useLottery = ({ lotteryId }: { lotteryId: number }) => {
  const [share, setShare] = useState<number>(1)

  // const router = useRouter()

  // useEffect(() => {
  //   router.refresh()
  // }, [router])

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

  const { data: simulate } = useSimulateMaidsLotteryEntry({
    args: [BigInt(share)],
  })
  const { data: hash, isPending, writeContract } = useWriteContract()
  // const { data: hash, isPending, writeContract, reset } = useWriteMaidsLotteryEntry()

  const {
    medalBalance,
    ticketBalance,
    isPending: isPendingApprove,
    approve,
    approved,
    refetchBalance,
  } = useMedalAndTicket()

  const { toast } = useToast()

  const entry = useCallback(() => {
    if (simulate === undefined) return
    writeContract(simulate.request)
    // writeContract({
    //   args: [BigInt(share)],
    // })
  }, [simulate, writeContract])

  const entryOrApprove = useCallback(() => {
    if (approved) {
      entry()
    } else {
      approve()
    }
  }, [approved, entry, approve])

  const { isLoading, status } = useWaitForTransactionReceipt({
    hash,
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
  }, [refetch, refetchBalance, status, toast])

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
    isPending: isPending || isLoading || isPendingApprove,
    maxShare: Math.min(medalBalance, ticketBalance),
    entryCounts: Number(entryCounts),
    buttonMessage: buttonMessage(),
    disabled: medalBalance === 0 || ticketBalance === 0 || !isOngoing,
    updateShare,
    entryOrApprove,
  }
}

export default useLottery
