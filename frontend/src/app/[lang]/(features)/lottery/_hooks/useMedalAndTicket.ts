import { useToast } from '@/components/hooks/use-toast'
import { NETWORK } from '@/config/client'
import {
  maidsLotteryAddress,
  medalNftConfig,
  ticketNftConfig,
  useSimulateMedalNftSetApprovalForAll,
  useSimulateTicketNftSetApprovalForAll,
} from '@/lib/generated'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAccount, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

const useMedalAndTicket = () => {
  const queryClient = useQueryClient()
  const { address } = useAccount()

  const { data, refetch } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: medalNftConfig.address[NETWORK.id],
        abi: medalNftConfig.abi,
        functionName: 'balanceOf',
        args: [address ?? '0x', 0n],
      },
      {
        address: ticketNftConfig.address[NETWORK.id],
        abi: ticketNftConfig.abi,
        functionName: 'balanceOf',
        args: [address ?? '0x', 5n],
      },
      {
        address: medalNftConfig.address[NETWORK.id],
        abi: medalNftConfig.abi,
        functionName: 'isApprovedForAll',
        args: [address ?? '0x', maidsLotteryAddress[NETWORK.id]],
      },
      {
        address: ticketNftConfig.address[NETWORK.id],
        abi: ticketNftConfig.abi,
        functionName: 'isApprovedForAll',
        args: [address ?? '0x', maidsLotteryAddress[NETWORK.id]],
      },
    ],
  })
  const [medalBalance, ticketBalance, medalIsApproved, ticketIsApproved] = data ?? [0, 0, false, false]

  const { data: medalApprove } = useSimulateMedalNftSetApprovalForAll({
    args: [maidsLotteryAddress[NETWORK.id], medalIsApproved === false],
  })

  const { data: ticketApprove } = useSimulateTicketNftSetApprovalForAll({
    args: [maidsLotteryAddress[NETWORK.id], ticketIsApproved === false],
  })
  const { data: writeData, isPending, writeContract } = useWriteContract()

  const { toast } = useToast()

  const approve = () => {
    if (!medalIsApproved && medalApprove !== undefined) {
      writeContract(medalApprove.request)
    }
    if (!ticketIsApproved && ticketApprove !== undefined) {
      writeContract(ticketApprove.request)
    }
  }

  const { isLoading, status } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Transaction Completed!',
        duration: 3000,
      })
      refetch()
    }
  }, [refetch, status, toast])

  return {
    medalBalance: medalBalance ? Number(medalBalance) : 0,
    ticketBalance: ticketBalance ? Number(ticketBalance) : 0,
    isPending: isPending || isLoading,
    approved: medalIsApproved && ticketIsApproved,
    approve,
    refetch,
  }
}

export default useMedalAndTicket
