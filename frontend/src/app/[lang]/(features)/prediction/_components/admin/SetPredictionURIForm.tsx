'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { useWriteMaidsPredictionSetPredictionUri } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'

const schema = z.object({
  predictionURI: z.string().url(),
})

type SetPredictionURIFormProps = {
  id: number
}

const SetPredictionURIForm = ({ id }: SetPredictionURIFormProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      predictionURI: '',
    },
  })

  const {
    data: predictionURIData,
    isPending,
    writeContract: writePredictionURI,
  } = useWriteMaidsPredictionSetPredictionUri()

  const writePredictionURITx = useWaitForTransactionReceipt({
    hash: predictionURIData,
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    writePredictionURI({
      args: [BigInt(id), values.predictionURI],
    })
  }

  return (
    <form onSubmit={form.handleSubmit((values) => onSubmit(values as z.infer<typeof schema>))} className='p-8'>
      <div>
        <label htmlFor='predictionURI'>PredictionURI</label>
        <input {...form.register('predictionURI')} placeholder='PredictionURI' />
      </div>
      <LoadingButtonForWeb3 loading={isPending || writePredictionURITx.isLoading}>
        Set PredictionURI
      </LoadingButtonForWeb3>
    </form>
  )
}

export default SetPredictionURIForm
