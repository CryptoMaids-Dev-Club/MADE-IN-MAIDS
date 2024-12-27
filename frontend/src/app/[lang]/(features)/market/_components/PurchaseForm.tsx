'use client'

import { usePurchase } from '@/app/[lang]/(features)/market/_hooks/usePurchase'
import type { MarketItemInfo } from '@/app/[lang]/(features)/market/_types'
import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Typography } from '@/components/ui/typography'
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAccount } from 'wagmi'

type PurchaseFormProps = {
  item: MarketItemInfo
}

export const PurchaseForm = ({ item }: PurchaseFormProps) => {
  const { address } = useAccount()
  const {
    amount,
    checked,
    range,
    buttonMessage,
    isLoading,
    updateAmount,
    toggleChecked,
    updateAddress,
    buyItemOrApprove,
  } = usePurchase({ address, item })

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
              <LoadingButtonForWeb3 className='w-full' loading={isLoading} onClick={buyItemOrApprove}>
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
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
