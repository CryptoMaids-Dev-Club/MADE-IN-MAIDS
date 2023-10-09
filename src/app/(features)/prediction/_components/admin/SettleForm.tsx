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
  choice: z.number().int().min(0).optional(),
})
type FormSchema = z.infer<typeof schema>

type SettleForm = {
  id: number
}

const SettleForm = ({ id }: SettleForm) => {
  const [choice, setChoice] = useState(0)
  const debounceChoice = useDebounce(choice, 500)

  // Settle
  const settleConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'settle',
    args: [id, debounceChoice],
  }).config
  const settle = useContractWrite({ ...settleConfig })
  const settleTx = useWaitForTransaction({
    hash: settle.data?.hash,
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
        {...register('choice', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: Choice'
        variant='standard'
        size='medium'
        onChange={(e) => setChoice(Number(e.target.value))}
        error={'choice' in errors}
        helperText={errors.choice?.message}
        type='number'
        fullWidth
      />
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(() => settle.write?.())}
        loading={settle.isLoading || settleTx.isLoading}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        Settle
      </LoadingButton>
    </>
  )
}

export default SettleForm
