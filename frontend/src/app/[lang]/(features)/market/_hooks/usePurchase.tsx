import type { MarketItemInfo } from '@/app/[lang]/(features)/market/_types'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { maidsMarketAddress, useReadMaidsTokenBalanceOf, useSimulateMaidsMarketBuyItem } from '@/lib/generated'
import { useCallback, useEffect, useState } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { type Address, formatEther } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

type usePurchaseProps = {
  address: Address | undefined
  item: MarketItemInfo
}

export const usePurchase = ({ address, item }: usePurchaseProps) => {
  const [approved, setApproved] = useState(false)
  const [amount, setAmount] = useState(1)
  const [checked, setChecked] = useState(false)
  const [differentAddress, setAddress] = useState<Address | undefined>()

  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsMarketAddress[NETWORK.id])
  const { approve, isPending: isLoadingApprove } = useApprove(maidsMarketAddress[NETWORK.id])
  const { toast } = useToast()

  const range = Math.min(item.supply, item.limitPerWallet, 10)

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
    query: {
      select: (data) => Number(formatEther(data)),
    },
  })

  const { data } = useSimulateMaidsMarketBuyItem({
    args: differentAddress
      ? [differentAddress, BigInt(item.id), BigInt(amount)]
      : [address ?? `0x${''}`, BigInt(item.id), BigInt(amount)],
  })

  const { data: writeData, isPending: isLoadingBuyItem, writeContract } = useWriteContract()

  const { isLoading, status, isSuccess } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  useEffect(() => {
    if (isSuccess) {
      console.log('Successfully bought!')
      toast({
        title: 'Successfully bought!',
        description: 'Share your purchase on X!',
        duration: 10000,
        action: (
          <TwitterShareButton
            url={`https://market.cryptomaids.tokyo/market/item/${item.id}`}
            title={`Successfully bought ${item.name}!`}
          >
            <XIcon size={32} round />
          </TwitterShareButton>
        ),
      })
      refetch()
    }
  }, [refetch, toast, item.id, item.name, isSuccess])

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
    if (balance < item.price * amount) return 'Insufficient $MAIDS'
    if (!approved) return 'Approve $MAIDS'
    return `Purchase for ${item.price * amount} $MAIDS`
  }, [amount, approved, balance, item.price])

  return {
    amount,
    checked,
    differentAddress,
    range,
    buttonMessage: buttonMessage(),
    approved,
    isLoading: isLoadingApprove || isLoadingBuyItem || isLoading,
    updateAmount,
    toggleChecked,
    updateAddress,
    buyItemOrApprove,
  }
}
