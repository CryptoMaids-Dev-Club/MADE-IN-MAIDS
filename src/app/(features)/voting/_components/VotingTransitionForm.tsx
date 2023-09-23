'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormSchema, formSchema } from '@/app/(features)/detail/voting/schema'

const textfieldStyle = {
  '& .MuiInputBase-input': {
    color: 'yellow', // 入力文字の色
  },
  '& label': {
    color: '#AAAAAA', // 通常時のラベル色
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white', // 通常時のボーダー色
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#DDDDDD', // ホバー時のボーダー色
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // 通常時のボーダー色(アウトライン)
    },
    '&:hover fieldset': {
      borderColor: '#DDDDDD', // ホバー時のボーダー色(アウトライン)
    },
  },
  mt: '5px',
}

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
      <Divider sx={{ bgcolor: 'primary.light', mt: '50px' }} />
      <Grid container alignItems='center' direction='column' mt='50px'>
        <Grid item>
          <Typography variant='h1' color='hotpink'>
            VOTING
          </Typography>
        </Grid>
        <Grid item mb='20px'>
          <TextField
            {...register('num', { valueAsNumber: true })}
            id='outlined-required'
            label='Required: tokenId'
            variant='standard'
            size='medium'
            error={'num' in errors}
            helperText={errors.num?.message}
            sx={{ ...textfieldStyle }}
            type='number'
            style={{ width: '350px' }}
          />
        </Grid>
        <Grid item>
          <Button
            size='large'
            onClick={handleSubmit(onSubmit)}
            sx={{ fontSize: '30px', border: '1px solid', mt: '20px' }}
            fullWidth>
            Go to Voting Page
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: 'primary.light', mt: '50px', mb: '30px' }} />
      <br />
    </>
  )
}

export default VotingTransitionForm
