'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { parseEther } from 'viem'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { marketContractConfig } from '@/config'

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

const validationRules = {
  price: {
    required: '価格を入力してください',
  },
  supply: {
    required: '数量を入力してください',
  },
  tokenURI: {
    required: 'tokenURIを入力してください',
  },
  startTime: {
    required: 'startTimeを入力してください',
  },
  limitPerWallet: {
    required: 'limitPerWalletを入力してください',
  },
}

type Inputs = {
  price: bigint
  supply: string
  tokenURI: string
  startTime: string
  limitPerWallet: string
}

const ItemCreate = () => {
  const { control, handleSubmit } = useForm<Inputs>()
  const { address } = useAccount()
  const [itemInfo, setItemInfo] = useState<Inputs>({
    price: BigInt(0),
    supply: '',
    tokenURI: '',
    startTime: '',
    limitPerWallet: '',
  })

  const { config } = usePrepareContractWrite({
    ...marketContractConfig,
    functionName: 'createMarketItem',
    args: itemInfo && address ? [itemInfo] : [],
  })
  const { write } = useContractWrite({
    ...config,
  })

  const onSubmit: SubmitHandler<Inputs> = () => {
    write?.()
  }

  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item xs={12}>
        <Controller
          name='price'
          control={control}
          rules={validationRules.price}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id='outlined-required'
              label='Required: 価格'
              variant='standard'
              size='medium'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e)
                setItemInfo({ ...itemInfo, price: parseEther(`${Number(e.target.value)}`) })
              }}
              style={{ width: '450px' }}
              sx={{ ...textfieldStyle }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='supply'
          control={control}
          rules={validationRules.supply}
          defaultValue=''
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id='outlined-required'
              label='Required: 数量'
              variant='standard'
              size='medium'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e)
                setItemInfo({ ...itemInfo, supply: e.target.value })
              }}
              style={{ width: '450px' }}
              sx={{ ...textfieldStyle }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='tokenURI'
          control={control}
          rules={validationRules.tokenURI}
          defaultValue=''
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id='outlined-multiline-flexible'
              label='Required: tokenURI'
              variant='standard'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e)
                setItemInfo({ ...itemInfo, tokenURI: e.target.value })
              }}
              value={itemInfo.tokenURI}
              style={{ width: '450px' }}
              sx={{ ...textfieldStyle }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='startTime'
          control={control}
          rules={validationRules.startTime}
          defaultValue=''
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id='outlined-multiline-flexible'
              label='Required: startTime'
              variant='standard'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e)
                setItemInfo({ ...itemInfo, startTime: e.target.value })
              }}
              value={itemInfo.startTime}
              style={{ width: '450px' }}
              sx={{ ...textfieldStyle }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='limitPerWallet'
          control={control}
          rules={validationRules.limitPerWallet}
          defaultValue=''
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id='outlined-multiline-flexible'
              label='Required: limitPerWallet'
              variant='standard'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e)
                setItemInfo({ ...itemInfo, limitPerWallet: e.target.value })
              }}
              value={itemInfo.limitPerWallet}
              style={{ width: '450px' }}
              sx={{ ...textfieldStyle }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          size='large'
          onClick={handleSubmit(onSubmit)}
          sx={{ fontSize: '40px', border: '1px solid #ccc', mt: '40px' }}>
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default ItemCreate
