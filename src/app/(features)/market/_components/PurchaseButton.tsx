'use client'

import { usePurchase } from '@/app/(features)/market/_hooks/usePurchase'
import { LoadingButton } from '@/components/ui/loading-button'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type PurchaseButtonProps = {
  item: MarketItemInfo
  amount: number
  differentAddress: string
}

const PurchaseButton = ({ item, amount, differentAddress }: PurchaseButtonProps) => {
  const { buyItemOrApprove, isActive, approved, isLoading } = usePurchase({
    item,
    amount,
    differentAddress,
  })

  return (
    <LoadingButton className='w-full' loading={isLoading} disabled={!isActive} onClick={buyItemOrApprove}>
      {approved ? `Purchase for ${Number(item.price) * amount} $MAIDS` : `Approve $MAIDS`}
    </LoadingButton>
  )
}

export default PurchaseButton
