'use client'

import { useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useWriteMaidsPredictionSetPredictionUri } from '@/lib/generated'

const schema = z.object({
  predictionURI: z.string().url(),
})

type SetPredictionURIFormProps = {
  id: number
}

const SetPredictionURIForm = ({ id }: SetPredictionURIFormProps) => {
  const [predictionURI, setPredictionURI] = useState('')
  const debouncePredictionURI = useDebounce(predictionURI, 500)

  const { data, isPending, writeContract } = useWriteMaidsPredictionSetPredictionUri({})

  const writePredictionURITx = useWaitForTransactionReceipt({
    hash: data,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() =>
        writeContract({
          args: [BigInt(id), debouncePredictionURI],
        })
      }
      fieldConfig={{
        predictionURI: {
          inputProps: {
            placeholder: 'PredictionURI',
          },
        },
      }}
      values={{ predictionURI }}
      onParsedValuesChange={(values) => setPredictionURI(values.predictionURI ?? '')}>
      <LoadingButtonForWeb3 loading={isPending || writePredictionURITx.isLoading}>
        Set PredictionURI
      </LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetPredictionURIForm
