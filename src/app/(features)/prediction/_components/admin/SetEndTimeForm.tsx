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
  endTime: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

type SetEndTimeForm = {
  id: number
}

const SetEndTimeForm = ({ id }: SetEndTimeForm) => {
  const [endTime, setEndTime] = useState(0)
  const debounceEndTime = useDebounce(endTime, 500)

  const setEndTimeConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setEndTime',
    args: [id, debounceEndTime],
  }).config
  const writeEndTime = useContractWrite({ ...setEndTimeConfig })
  const writeEndTimeTx = useWaitForTransaction({
    hash: writeEndTime.data?.hash,
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => writeEndTime.write?.())} className='w-56'>
        <FormField
          control={form.control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>EndTime</FormLabel>
              <FormControl>
                <Input {...field} onChange={(event) => setEndTime(Number(event.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={writeEndTime.isLoading || writeEndTimeTx.isLoading}>Set EndTime</LoadingButton>
      </form>
    </Form>
  )
}

export default SetEndTimeForm
