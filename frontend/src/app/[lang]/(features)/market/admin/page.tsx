'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsMarketCreateMarketItem } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  price: z.coerce.number().min(1).optional(),
  supply: z.coerce.number().min(1).optional(),
  tokenURI: z.coerce.string().min(1).optional(),
  startTime: z.coerce.number().min(1).optional(),
  limitPerWallet: z.coerce.number().min(1).optional(),
})
type ItemInfo = z.infer<typeof schema>

const ItemCreate = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 0,
      supply: 0,
      tokenURI: '',
      startTime: 0,
      limitPerWallet: 0,
    },
  })

  const { writeContract } = useWriteMaidsMarketCreateMarketItem()

  const handleSubmit = (data: ItemInfo) => {
    writeContract({
      args: [
        {
          price: BigInt(data.price ?? 0),
          supply: BigInt(data.supply ?? 0),
          tokenURI: data.tokenURI ?? '',
          startTime: BigInt(data.startTime ?? 0),
          limitPerWallet: BigInt(data.limitPerWallet ?? 0),
        },
      ],
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='p-8'>
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Price' />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='supply'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supply</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Supply' />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='tokenURI'
          render={({ field }) => (
            <FormItem>
              <FormLabel>TokenURI</FormLabel>
              <FormControl>
                <Input {...field} placeholder='TokenURI' />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='startTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>StartTime</FormLabel>
              <FormControl>
                <Input {...field} placeholder='StartTime' />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='limitPerWallet'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LimitPerWallet</FormLabel>
              <FormControl>
                <Input {...field} placeholder='LimitPerWallet' />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button type='submit'>Create</Button>
      </form>
    </Form>
  )
}

export default ItemCreate
