'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { maidsPredictionContractConfig } from '@/config/client'

const schema = z.object({
  predictionURI: z.string().url(),
})
type FormSchema = z.infer<typeof schema>

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <>
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
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(() => writePredictionURI.write?.())}
        loading={writePredictionURI.isLoading || writePredictionURITx.isLoading}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        Set PredictionURI
      </LoadingButton>
    </>
  )
}

export default SetPredictionURIForm
