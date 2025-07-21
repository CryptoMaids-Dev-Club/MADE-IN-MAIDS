'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsPredictionSetEndTime } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'

const schema = z.object({
  endTime: z.number().positive().int().min(1),
})

type SetEndTimeForm = {
  id: number
}

const SetEndTimeForm = ({ id }: SetEndTimeForm) => {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  const { data: endTimeData, isPending, writeContract: writeEndTime } = useWriteMaidsPredictionSetEndTime()

  const writeEndTimeTx = useWaitForTransactionReceipt({
    hash: endTimeData,
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    writeEndTime({
      args: [BigInt(id), BigInt(values.endTime)],
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values as z.infer<typeof schema>))} className='p-8'>
        <FormField
          control={form.control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>EndTime</FormLabel>
              <FormControl>
                <Input {...field} placeholder='EndTime' />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButtonForWeb3 loading={isPending || writeEndTimeTx.isLoading}>Set EndTime</LoadingButtonForWeb3>
      </form>
    </Form>
  )
}

export default SetEndTimeForm
