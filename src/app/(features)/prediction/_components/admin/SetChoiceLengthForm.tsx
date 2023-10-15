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
  choiceLength: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

type SetChoiceLength = {
  id: number
}

const SetChoiceLength = ({ id }: SetChoiceLength) => {
  const [choiceLength, setChoiceLength] = useState(0)
  const debounceChoiceLength = useDebounce(choiceLength, 500)

  const setChoiceLengthConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setChoicesLength',
    args: [id, debounceChoiceLength],
  }).config
  const writeChoiceLength = useContractWrite({ ...setChoiceLengthConfig })
  const writeChoiceLengthTx = useWaitForTransaction({
    hash: writeChoiceLength.data?.hash,
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
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(() => writeChoiceLength.write?.())}
        loading={writeChoiceLength.isLoading || writeChoiceLengthTx.isLoading}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        Set ChoiceLength
      </LoadingButton>
    </>
  )
}

export default SetChoiceLength
