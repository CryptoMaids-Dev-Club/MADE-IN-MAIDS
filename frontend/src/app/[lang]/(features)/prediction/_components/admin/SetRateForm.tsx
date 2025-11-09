'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { useWriteMaidsPredictionSetRate } from '@/lib/generated'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import * as v from 'valibot'

const schema = v.object({
  rate: v.pipe(v.number(), v.integer(), v.minValue(1)),
})

type SetRateFormProps = {
  id: number
}

const SetRateForm = ({ id }: SetRateFormProps) => {
  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      rate: 0,
    },
  })

  const { data: rateData, isPending, writeContract: writeRate } = useWriteMaidsPredictionSetRate()

  const writeRateTx = useWaitForTransactionReceipt({
    hash: rateData,
  })

  const onSubmit = (values: v.InferOutput<typeof schema>) => {
    writeRate({
      args: [BigInt(id), BigInt(values.rate)],
    })
  }

  return (
    <form onSubmit={form.handleSubmit((values) => onSubmit(values as v.InferOutput<typeof schema>))} className='p-8'>
      <div>
        <label htmlFor='rate'>Rate</label>
        <input {...form.register('rate')} placeholder='Rate' />
      </div>
      <LoadingButtonForWeb3 loading={isPending || writeRateTx.isLoading}>Set Rate</LoadingButtonForWeb3>
    </form>
  )
}

export default SetRateForm
