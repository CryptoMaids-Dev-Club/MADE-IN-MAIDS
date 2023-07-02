import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const validationRules = {
  id: {
    required: 'tokenIDを入力してください',
  },
}

type Inputs = {
  id: string
}

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

export const Voting = () => {
  const { control, handleSubmit } = useForm<Inputs>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    navigate(`./detail/${data.id}`)
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
          <Controller
            name='id'
            control={control}
            rules={validationRules.id}
            defaultValue=''
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id='outlined-required'
                label='Required: tokenId'
                variant='standard'
                size='medium'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ ...textfieldStyle }}
                type='number'
                style={{ width: '350px' }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            size='large'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

export default Voting
