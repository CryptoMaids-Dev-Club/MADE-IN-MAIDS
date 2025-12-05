'use client'

import { useToast } from '@/components/hooks/use-toast'
import { API_SERVER, NETWORK } from '@/config/client'
import { maidsTokenAddress, useReadMaidsTokenBalanceOf } from '@/lib/generated'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatEther } from 'viem'
import { useAccount, useChainId, useSignMessage, useWatchAsset } from 'wagmi'

export const useStaking = () => {
  const { toast } = useToast()
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()
  const { watchAsset } = useWatchAsset()

  // Fetch pending rewards with TanStack Query
  const { data: pendingRewards } = useQuery({
    queryKey: ['pendingRewards', address],
    queryFn: async () => {
      if (!address) return { pendingTokens: '0' }
      const response = await fetch(`${API_SERVER}/getPendingTokensMany?address=${address}`)
      if (!response.ok) {
        throw new Error('Failed to fetch pending rewards')
      }
      return response.json()
    },
    select: (data) => Math.floor(Number(data)),
    enabled: !!address && isConnected,
  })

  // バランスの取得
  const { data: balance, refetch } = useReadMaidsTokenBalanceOf({
    args: address ? [address] : undefined,
  })

  // MAIDSトークンのインポート
  const importMaidsToken = async () => {
    try {
      await watchAsset({
        type: 'ERC20',
        options: {
          address: maidsTokenAddress[NETWORK.id],
          symbol: 'MAIDS',
          decimals: 18,
        },
      })
    } catch (error) {
      // Token import failed silently - this is expected behavior when user rejects
    }
  }

  // Claim Rewards with mutation
  const { mutateAsync: claimRewards } = useMutation({
    mutationFn: async () => {
      if (!address) return

      const toastInstance = toast({
        title: 'Claiming $MAIDS...',
        variant: 'default',
      })

      try {
        const message = `Claim $MAIDS: ${address}`
        const signature = await signMessageAsync({ message })

        const response = await fetch(`${API_SERVER}/claim`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            signature,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to claim rewards')
        }

        const result = await response.json()

        toastInstance.update({
          id: toastInstance.id,
          title: 'Successfully claimed $MAIDS!',
          variant: 'default',
          duration: 5000,
        })

        return result
      } catch (error) {
        toastInstance.update({
          id: toastInstance.id,
          title: 'Failed to claim $MAIDS',
          variant: 'destructive',
          duration: 5000,
        })
        throw error
      }
    },
    onSuccess: () => {
      // Invalidate and refetch pending rewards after successful claim
      queryClient.invalidateQueries({ queryKey: ['pendingRewards', address] })
      refetch()
    },
  })

  return {
    currentBalance: balance ? Math.floor(Number(formatEther(balance))) : 0,
    pendingRewards: pendingRewards || 0,
    importMaidsToken,
    claimRewards,
    isConnected,
    chainId,
  }
}
