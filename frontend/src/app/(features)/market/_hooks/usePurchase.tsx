import { useState, useEffect } from 'react'
import { TwitterShareButton, XIcon } from 'react-share'
import { Address, useAccount, useWaitForTransaction } from 'wagmi'
import { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import { useToast } from '@/components/ui/use-toast'
import { NETWORK } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { maidsTokenAddress, useMaidsMarketBuyItem } from '@/lib/generated'

type usePurchaseProps = {
  item: MarketItemInfo
  amount: number
  differentAddress: string
}

export const usePurchase = ({ item, amount, differentAddress }: usePurchaseProps) => {
  const [isActive, setIsActive] = useState(false)
  const [approved, setApproved] = useState(false)
  const { address } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, maidsTokenAddress[NETWORK.id])
  const { approve, isLoading: isLoadingApprove, approveTx } = useApprove(maidsTokenAddress[NETWORK.id])
  const { toast } = useToast()

  useEffect(() => {
    const checkActive = () => {
      const active = item.supply > 0

      if (address != null && active) {
        setIsActive(active)
      }
    }
    checkActive()
  }, [address, item.supply])

  useEffect(() => {
    const totalPrice = Number(item.price) * amount
    setApproved((allowance ?? 0) >= totalPrice)
  }, [allowance, amount, item.price])

  const {
    data: buyItemData,
    isLoading: isLoadingBuyItem,
    write: buyItem,
  } = useMaidsMarketBuyItem({
    args:
      differentAddress !== ''
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

  const buyItemOrApprove = () => {
    if (approved) {
      buyItem()
    } else {
      approve()
    }
  }

  return {
    buyItemOrApprove,
    isActive,
    approved,
    isLoading: isLoadingApprove || isLoadingBuyItem || approveTx.isLoading || buyItemTx.isLoading,
  }
}
