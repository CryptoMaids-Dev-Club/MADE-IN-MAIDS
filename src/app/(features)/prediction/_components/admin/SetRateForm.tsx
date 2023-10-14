'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { maidsPredictionContractConfig } from '@/config'

const schema = z.object({
  rate: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

type SetRateForm = {
  id: number
}

const SetRateForm = ({ id }: SetRateForm) => {
  const [rate, setRate] = useState(0)
  const debounceRate = useDebounce(rate, 500)

  const setRateConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setRate',
    args: [id, debounceRate],
  }).config
  const writeRate = useContractWrite({ ...setRateConfig })
  const writeRateTx = useWaitForTransaction({
    hash: writeRate.data?.hash,
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
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(() => writeRate.write?.())}
        loading={writeRate.isLoading || writeRateTx.isLoading}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        Set Rate
      </LoadingButton>
    </>
  )
}

export default SetRateForm
