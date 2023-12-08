'use client'

import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
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

  const setPredictionURIConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setPredictionURI',
    args: [id, debouncePredictionURI],
  }).config
  const writePredictionURI = useContractWrite({ ...setPredictionURIConfig })
  const writePredictionURITx = useWaitForTransaction({
    hash: writePredictionURI.data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => writePredictionURI.write?.()}
      fieldConfig={{
        predictionURI: {
          inputProps: {
            placeholder: 'PredictionURI',
          },
        },
      }}
      values={{ predictionURI }}
      onParsedValuesChange={(values) => setPredictionURI(values.predictionURI ?? '')}>
      <LoadingButton loading={writePredictionURI.isLoading || writePredictionURITx.isLoading}>
        Set PredictionURI
      </LoadingButton>
    </AutoForm>
  )
}

export default SetPredictionURIForm
