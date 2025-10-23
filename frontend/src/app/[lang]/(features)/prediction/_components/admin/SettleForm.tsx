'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsPredictionSettle } from '@/lib/generated'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import * as v from 'valibot'

const schema = v.object({
  choice: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
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
    resolver: valibotResolver(schema),
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
