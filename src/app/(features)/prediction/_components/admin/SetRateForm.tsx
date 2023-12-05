'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  rate: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

type SetRateForm = {
  id: number
}

const SetRateForm = ({ id }: SetRateForm) => {
  const [rate, setRate] = useState(0)
  const debounceRate = useDebounce(rate, 500)

  const setRateConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setRate',
    args: [id, debounceRate],
  }).config
  const writeRate = useContractWrite({ ...setRateConfig })
  const writeRateTx = useWaitForTransaction({
    hash: writeRate.data?.hash,
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => writeRate.write?.())} className='w-56'>
        <FormField
          control={form.control}
          name='rate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate</FormLabel>
              <FormControl>
                <Input {...field} onChange={(event) => setRate(Number(event.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={writeRate.isLoading || writeRateTx.isLoading}>Set Rate</LoadingButton>
      </form>
    </Form>
  )
}

export default SetRateForm
