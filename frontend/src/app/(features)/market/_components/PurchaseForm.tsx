'use client'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Typography } from '@/components/ui/typography'
import PurchaseButton from './PurchaseButton'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type PurchaseFormProps = {
  item: MarketItemInfo
}

export const PurchaseForm = ({ item }: PurchaseFormProps) => {
  const [amount, setAmount] = useState(1)
  const [checked, setChecked] = useState(false)
  const [differentAddress, setAddress] = useState('')

  const range = Math.min(Number(item.supply), 10)

  return (
    <div className='my-2'>
      {Number(item.supply) <= 0 ? (
        <Typography variant='h5' className='w-full text-center'>
          SOLD OUT!
        </Typography>
      ) : (
        <>
          <div className='grid grid-cols-5 gap-4'>
            <div className='col-span-4'>
              {checked ? (
                <PurchaseButton item={item} amount={amount} differentAddress={differentAddress} />
              ) : (
                <PurchaseButton item={item} amount={amount} />
              )}
            </div>
            <div className='col-span-1'>
              <Select value={amount.toString()} onValueChange={(e) => setAmount(Number(e))}>
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
          <Switch checked={checked} onCheckedChange={() => setChecked(!checked)} />
          {checked && (
            <Input
              type='text'
              id='address'
              className='h-8'
              required
              placeholder='Enter address'
              onChange={(event) => {
                setAddress(event.target.value)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default PurchaseForm
