import { useState, useEffect, useCallback } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { MarketItemInfo } from '@/app/(features)/market/_types'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import {
  maidsMarketAddress,
  maidsTokenAddress,
  useReadMaidsTokenBalanceOf,
  useSimulateMaidsMarketBuyItem,
} from '@/lib/generated'
import type { Address } from 'viem'

type usePurchaseProps = {
  item: MarketItemInfo
}

export const usePurchase = ({ item }: usePurchaseProps) => {
  const [isActive, setIsActive] = useState(false)
  const [approved, setApproved] = useState(false)
  const [amount, setAmount] = useState(1)
  const [checked, setChecked] = useState(false)
  const [differentAddress, setAddress] = useState<Address>(`0x${''}`)

  const { address, isConnected } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsMarketAddress[NETWORK.id])
  const { approve, isPending: isLoadingApprove } = useApprove(maidsTokenAddress[NETWORK.id])
  const { toast } = useToast()

  const range = Math.min(item.supply, 10)

  useEffect(() => {
    setIsActive(item.supply > 0 && isConnected)
  }, [address, isConnected, item.supply])

  useEffect(() => {
    const totalPrice = item.price * amount
    setApproved(allowance >= totalPrice)
  }, [allowance, amount, item.price])

  const updateAmount = useCallback((e: number) => {
    setAmount(Number(e))
  }, [])

  const toggleChecked = useCallback(() => {
    setChecked(!checked)
  }, [checked])

  const updateAddress = useCallback((e: string) => {
    setAddress(e as Address)
  }, [])

  const { data: balance } = useReadMaidsTokenBalanceOf({
    args: [address ?? (`0x${''}` as Address)],
  })

  const { data } = useSimulateMaidsMarketBuyItem({
    args:
      differentAddress === `0x${''}`
        ? [address ?? `0x${''}`, BigInt(item.id), BigInt(amount)]
        : [differentAddress, BigInt(item.id), BigInt(amount)],
  })

  const { data: writeData, isPending: isLoadingBuyItem, writeContract } = useWriteContract()

  const { isLoading, status } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Successfully bought!',
        description: 'Share your purchase on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/market/item/${item.id}`}
            title={`Successfully bought ${item.name}!`}>
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
      refetch()
    }
  }, [status, refetch, toast, item.id, item.name])

  const buyItem = useCallback(() => {
    if (data === undefined) return
    writeContract(data.request)
  }, [data, writeContract])

  const buyItemOrApprove = useCallback(() => {
    if (approved) {
      buyItem()
    } else {
      approve()
    }
  }, [approved, buyItem, approve])

  const buttonMessage = useCallback(() => {
    if (balance === undefined) return 'Loading...'
    if (balance < BigInt(item.price) * BigInt(amount)) return 'Insufficient $MAIDS'
    if (!approved) return 'Approve $MAIDS'
    return `Purchase for ${item.price * amount} $MAIDS`
  }, [amount, approved, balance, item.price])

  return {
    amount,
    checked,
    differentAddress,
    range,
    buttonMessage: buttonMessage(),
    isActive,
    approved,
    isLoading: isLoadingApprove || isLoadingBuyItem || isLoading,
    updateAmount,
    toggleChecked,
    updateAddress,
    buyItemOrApprove,
  }
}
