import { useState, useEffect, useCallback } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { Address, useAccount, useWaitForTransaction } from 'wagmi'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { maidsTokenAddress, useMaidsMarketBuyItem, useMaidsTokenBalanceOf } from '@/lib/generated'
import { MarketItemInfo } from '@/server/market/marketItem'

type usePurchaseProps = {
  item: MarketItemInfo
}

export const usePurchase = ({ item }: usePurchaseProps) => {
  const [isActive, setIsActive] = useState(false)
  const [approved, setApproved] = useState(false)
  const [amount, setAmount] = useState(1)
  const [checked, setChecked] = useState(false)
  const [differentAddress, setAddress] = useState(`0x${''}`)

  const { address, isConnected } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsTokenAddress[NETWORK.id])
  const { approve, isLoading: isLoadingApprove, approveTx } = useApprove(maidsTokenAddress[NETWORK.id])
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
    setAddress(e)
  }, [])

  const { data: balance } = useMaidsTokenBalanceOf({
    args: [address ?? (`0x${''}` as Address)],
  })

  const {
    data: buyItemData,
    isLoading: isLoadingBuyItem,
    write: buyItem,
  } = useMaidsMarketBuyItem({
    args:
      differentAddress !== `0x${''}`
        ? [differentAddress as Address, BigInt(item.id), BigInt(amount)]
        : [address ?? ('0x0' as Address), BigInt(item.id), BigInt(amount)],
  })

  const buyItemTx = useWaitForTransaction({
    hash: buyItemData?.hash,
    onSuccess() {
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
    },
  })

  const buyItemOrApprove = useCallback(() => {
    if (approved) {
      buyItem()
    } else {
      approve()
    }
  }, [approved, approve, buyItem])

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
    isLoading: isLoadingApprove || isLoadingBuyItem || approveTx.isLoading || buyItemTx.isLoading,
    updateAmount,
    toggleChecked,
    updateAddress,
    buyItemOrApprove,
  }
}
