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
  choice: z.number().int().min(0).optional(),
})
type FormSchema = z.infer<typeof schema>

type SettleForm = {
  id: number
}

const SettleForm = ({ id }: SettleForm) => {
  const [choice, setChoice] = useState(0)
  const debounceChoice = useDebounce(choice, 500)

  // Settle
  const settleConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'settle',
    args: [id, debounceChoice],
  }).config
  const settle = useContractWrite({ ...settleConfig })
  const settleTx = useWaitForTransaction({
    hash: settle.data?.hash,
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => settle.write?.())} className='w-56'>
        <FormField
          control={form.control}
          name='choice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Settle</FormLabel>
              <FormControl>
                <Input {...field} onChange={(event) => setChoice(Number(event.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={settle.isLoading || settleTx.isLoading}>Settle</LoadingButton>
      </form>
    </Form>
  )
}

export default SettleForm
