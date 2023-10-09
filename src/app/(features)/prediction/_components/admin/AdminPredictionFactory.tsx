'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { maidsPredictionContractConfig } from '@/config'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
  predictionURI: z.string().url(),
  rate: z.number().positive().int().min(1),
  endTime: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <Container>
      <TextField
        {...register('choiceLength', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: ChoiceLength'
        variant='standard'
        size='medium'
        onChange={(e) => setChoiceLength(Number(e.target.value))}
        error={'choiceLength' in errors}
        helperText={errors.choiceLength?.message}
        type='number'
        fullWidth
      />
      <TextField
        {...register('predictionURI')}
        id='outlined-required'
        label='Required: PredictionURI'
        variant='standard'
        size='medium'
        onChange={(e) => setPredictionURI(e.target.value)}
        error={'predictionURI' in errors}
        helperText={errors.predictionURI?.message}
        fullWidth
      />
      <TextField
        {...register('rate', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: Rate'
        variant='standard'
        size='medium'
        onChange={(e) => setRate(Number(e.target.value))}
        error={'rate' in errors}
        helperText={errors.rate?.message}
        type='number'
        fullWidth
      />
      <TextField
        {...register('endTime', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: EndTime'
        variant='standard'
        size='medium'
        onChange={(e) => setEndTime(Number(e.target.value))}
        error={'endTime' in errors}
        helperText={errors.endTime?.message}
        type='number'
        fullWidth
      />
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(() => createPrediction.write?.())}
        loading={createPrediction.isLoading || createPredictionTx.isLoading}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        Create Prediction
      </LoadingButton>
    </Container>
  )
}

export default AdminPredictionFactory
