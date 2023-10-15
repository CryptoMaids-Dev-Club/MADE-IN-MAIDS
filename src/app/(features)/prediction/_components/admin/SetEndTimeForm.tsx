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
  endTime: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

type SetEndTimeForm = {
  id: number
}

const SetEndTimeForm = ({ id }: SetEndTimeForm) => {
  const [endTime, setEndTime] = useState(0)
  const debounceEndTime = useDebounce(endTime, 500)

  const setEndTimeConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setEndTime',
    args: [id, debounceEndTime],
  }).config
  const writeEndTime = useContractWrite({ ...setEndTimeConfig })
  const writeEndTimeTx = useWaitForTransaction({
    hash: writeEndTime.data?.hash,
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
        {...register('endTime', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: EndTime'
        variant='standard'
        size='medium'
        onChange={(e) => setEndTime(Number(e.target.value))}
        error={'choice' in errors}
        helperText={errors.endTime?.message}
        type='number'
        fullWidth
      />
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(() => writeEndTime.write?.())}
        loading={writeEndTime.isLoading || writeEndTimeTx.isLoading}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        Set EndTime
      </LoadingButton>
    </>
  )
}

export default SetEndTimeForm
