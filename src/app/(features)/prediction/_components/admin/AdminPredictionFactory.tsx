'use client'

import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
  predictionURI: z.string().url(),
  rate: z.number().positive().int().min(1),
  endTime: z.number().positive().int().min(1),
})

const AdminPredictionFactory = () => {
  const [choiceLength, setChoiceLength] = useState(0)
  const [predictionURI, setPredictionURI] = useState('')
  const [rate, setRate] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const debounceChoiceLength = useDebounce(choiceLength, 500)
  const debouncePredictionURI = useDebounce(predictionURI, 500)
  const debounceRate = useDebounce(rate, 500)
  const debounceEndTime = useDebounce(endTime, 500)

  const predictionConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'createPrediction',
    args: [debounceChoiceLength, debouncePredictionURI, debounceRate, debounceEndTime],
  }).config
  const createPrediction = useContractWrite({ ...predictionConfig })

  const createPredictionTx = useWaitForTransaction({
    hash: createPrediction.data?.hash,
  })

  return (
    <div className='container mx-auto my-8 max-w-6xl'>
      <AutoForm
        formSchema={schema}
        onSubmit={() => createPrediction.write?.()}
        fieldConfig={{
          choiceLength: {
            inputProps: {
              placeholder: 'ChoiceLength',
            },
          },
          predictionURI: {
            inputProps: {
              placeholder: 'PredictionURI',
            },
          },
          rate: {
            inputProps: {
              placeholder: 'Rate',
            },
          },
          endTime: {
            inputProps: {
              placeholder: 'EndTime',
            },
          },
        }}
        values={{ choiceLength, predictionURI, rate, endTime }}
        onParsedValuesChange={(values) => {
          setChoiceLength(values.choiceLength ?? 0)
          setPredictionURI(values.predictionURI ?? '')
          setRate(values.rate ?? 0)
          setEndTime(values.endTime ?? 0)
        }}>
        <LoadingButton loading={createPredictionTx.isLoading} className='mt-2 w-56' type='submit'>
          Create Prediction
        </LoadingButton>
      </AutoForm>
    </div>
  )
}

export default AdminPredictionFactory
