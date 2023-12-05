'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { marketContractConfig } from '@/config/client'

const schema = z.object({
  price: z.coerce.number().min(1),
  supply: z.coerce.string().min(1),
  tokenURI: z.coerce.string().min(1),
  startTime: z.coerce.number().min(1),
  limitPerWallet: z.coerce.number().min(1),
})

export type FormSchema = z.infer<typeof schema>

type Inputs = {
  price: number
  supply: string
  tokenURI: string
  startTime: string
  limitPerWallet: string
}

const ItemCreate = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const { address } = useAccount()
  const [itemInfo, setItemInfo] = useState<Inputs>({
    price: 0,
    supply: '',
    tokenURI: '',
    startTime: '',
    limitPerWallet: '',
  })

  const { config } = usePrepareContractWrite({
    ...marketContractConfig,
    functionName: 'createMarketItem',
    args: itemInfo && address ? [itemInfo] : [],
  })
  const { write } = useContractWrite({
    ...config,
  })

  const onSubmit: SubmitHandler<Inputs> = () => {
    write?.()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required: 価格</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      setItemInfo({ ...itemInfo, price: Number(event.target.value) })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='supply'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required: 数量</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      setItemInfo({ ...itemInfo, supply: event.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tokenURI'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required: tokenURI</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      setItemInfo({ ...itemInfo, tokenURI: event.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required: startTime</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      setItemInfo({ ...itemInfo, startTime: event.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='limitPerWallet'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required: limitPerWallet</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      setItemInfo({ ...itemInfo, limitPerWallet: event.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
            Create
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ItemCreate
