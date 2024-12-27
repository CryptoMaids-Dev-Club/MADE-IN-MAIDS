'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { useWriteMaidsPredictionSetRate } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'

const schema = z.object({
  rate: z.number().positive().int().min(1),
})

type SetRateFormProps = {
  id: number
}

const SetRateForm = ({ id }: SetRateFormProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rate: 0,
    },
  })

  const { data: rateData, isPending, writeContract: writeRate } = useWriteMaidsPredictionSetRate()

  const writeRateTx = useWaitForTransactionReceipt({
    hash: rateData,
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    writeRate({
      args: [BigInt(id), BigInt(values.rate)],
    })
  }

  return (
    <form onSubmit={form.handleSubmit((values) => onSubmit(values as z.infer<typeof schema>))} className='p-8'>
      <div>
        <label htmlFor='rate'>Rate</label>
        <input {...form.register('rate')} placeholder='Rate' />
      </div>
      <LoadingButtonForWeb3 loading={isPending || writeRateTx.isLoading}>Set Rate</LoadingButtonForWeb3>
    </form>
  )
}

export default SetRateForm
