'use client'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { usePurchase } from '@/app/(features)/market/_hooks/usePurchase'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Typography } from '@/components/ui/typography'
import type { MarketItemInfo } from '@/server/market/marketItem'

type PurchaseFormProps = {
  item: MarketItemInfo
}

export const PurchaseForm = ({ item }: PurchaseFormProps) => {
  const {
    amount,
    checked,
    range,
    buttonMessage,
    isActive,
    isLoading,
    updateAmount,
    toggleChecked,
    updateAddress,
    buyItemOrApprove,
  } = usePurchase({ item })

  return (
    <div className='my-2'>
      {item.supply <= 0 ? (
        <Typography variant='h5' className='w-full text-center'>
          SOLD OUT!
        </Typography>
      ) : (
        <>
          <div className='grid grid-cols-5 gap-4'>
            <div className='col-span-4'>
              <LoadingButtonForWeb3
                className='w-full'
                loading={isLoading}
                disabled={!isActive}
                onClick={buyItemOrApprove}>
                {buttonMessage}
              </LoadingButtonForWeb3>
            </div>
            <div className='col-span-1'>
              <Select value={amount.toString()} onValueChange={(e) => updateAmount(Number(e))}>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[...Array(range)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Typography>Mint to a different wallet</Typography>
          <Switch checked={checked} onCheckedChange={() => toggleChecked()} />
          {checked && (
            <Input
              type='text'
              id='address'
              className='h-8'
              required
              placeholder='Enter address'
              onChange={(event) => {
                updateAddress(event.target.value)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default PurchaseForm
