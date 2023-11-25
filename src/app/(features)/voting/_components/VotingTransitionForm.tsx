'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormSchema, formSchema } from '@/app/(features)/detail/voting/schema'

export const VotingTransitionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<FormSchema> = (data: FormSchema) => {
    router.push(`/detail/${data.num}`)
  }

  return (
    <>
      <TextField
        {...register('num', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: tokenId'
        variant='standard'
        size='medium'
        error={'num' in errors}
        helperText={errors.num?.message}
        type='number'
        style={{ width: '350px' }}
      />
      <div>
        <Button size='large' onClick={handleSubmit(onSubmit)} sx={{ fontSize: '30px', border: '1px solid' }}>
          Go to Voting Page
        </Button>
      </div>
    </>
  )
}

export default VotingTransitionForm
