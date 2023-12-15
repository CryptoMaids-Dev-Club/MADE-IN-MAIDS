'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useMaidsPredictionSetPredictionUri } from '@/lib/generated'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  predictionURI: z.string().url(),
})

type SetPredictionURIFormProps = {
  id: number
}

const SetPredictionURIForm = ({ id }: SetPredictionURIFormProps) => {
  const [predictionURI, setPredictionURI] = useState('')
  const debouncePredictionURI = useDebounce(predictionURI, 500)

  const { data, isLoading, write } = useMaidsPredictionSetPredictionUri({
    args: [BigInt(id), debouncePredictionURI],
  })

  const writePredictionURITx = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => write()}
      fieldConfig={{
        predictionURI: {
          inputProps: {
            placeholder: 'PredictionURI',
          },
        },
      }}
      values={{ predictionURI }}
      onParsedValuesChange={(values) => setPredictionURI(values.predictionURI ?? '')}>
      <LoadingButtonForWeb3 loading={isLoading || writePredictionURITx.isLoading}>
        Set PredictionURI
      </LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetPredictionURIForm
