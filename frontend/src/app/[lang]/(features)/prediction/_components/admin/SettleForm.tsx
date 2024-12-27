'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsPredictionSettle } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'

const schema = z.object({
  choice: z.number().int().min(0).optional(),
})

type SettleForm = {
  id: number
}

const SettleForm = ({ id }: SettleForm) => {
  const { data, isPending, writeContract } = useWriteMaidsPredictionSettle({})

  const settleTx = useWaitForTransactionReceipt({
    hash: data,
  })

  const form = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          writeContract({
            args: [BigInt(id), BigInt(data.choice)],
          })
        })}
        className='p-8'
      >
        <FormField
          control={form.control}
          name='choice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Settle</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Settle' />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButtonForWeb3 loading={isPending || settleTx.isLoading}>Settle</LoadingButtonForWeb3>
      </form>
    </Form>
  )
}

export default SettleForm
