'use client'

import { usePurchase } from '@/app/(features)/market/_hooks/usePurchase'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type PurchaseButtonProps = {
  item: MarketItemInfo
  amount: number
  differentAddress?: string
}

const PurchaseButton = ({ item, amount, differentAddress }: PurchaseButtonProps) => {
  const { buyItemOrApprove, buttonMessage, isActive, isLoading } = usePurchase({
    item,
    amount,
    differentAddress,
  })

  return (
    <LoadingButtonForWeb3 className='w-full' loading={isLoading} disabled={!isActive} onClick={buyItemOrApprove}>
      {buttonMessage}
    </LoadingButtonForWeb3>
  )
}

export default PurchaseButton
