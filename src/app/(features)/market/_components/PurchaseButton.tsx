'use client'

import { usePurchase } from '@/app/(features)/market/_hooks/usePurchase'
import { TwitterAlert } from '@/app/_components/Elements/TwitterAlert'
import { LoadingButton } from '@/components/ui/LoadingButton'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type PurchaseButtonProps = {
  item: MarketItemInfo
  amount: number
  differentAddress: string
}

const PurchaseButton = ({ item, amount, differentAddress }: PurchaseButtonProps) => {
  const { buyItemOrApprove, isActive, approved, isLoading, Snackbar } = usePurchase({
    item,
    amount,
    differentAddress,
  })

  return (
    <>
      <LoadingButton
        className='w-full bg-blue-300 hover:bg-blue-300/80'
        loading={isLoading}
        disabled={!isActive}
        onClick={buyItemOrApprove}>
        {approved ? `Purchase for ${Number(item.price) * amount} $MAIDS` : `Approve $MAIDS`}
      </LoadingButton>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={10000}>
        <TwitterAlert
          message='Successfully bought! Share'
          title={`Successfully bought ${item.name}!`}
          url={`https://made-in-maids.vercel.app/market/item/${item.id}`}
          hashtags={['CryptoMaids']}
        />
      </Snackbar>
    </>
  )
}

export default PurchaseButton
