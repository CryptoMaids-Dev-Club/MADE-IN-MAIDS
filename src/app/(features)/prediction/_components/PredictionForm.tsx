'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

import { parseEther } from 'viem'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { MAIDS_PREDICTION_CONTRACT_ADDRESS, maidsContractConfig, maidsPredictionContractConfig } from '@/config'
import useAllowance from '@/hooks/useAllowance'
import type { Prediction, PredictionText, SolidityUserInfo } from '@/app/api/prediction/prediction'

type PredictionFormProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const schema = z.object({
  amount: z.number(),
})
type FormSchema = z.infer<typeof schema>

const PredictionForm = ({ predictionInfo, predictionText: PredictionText }: PredictionFormProps) => {
  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  const [choice, setChoice] = useState(0)
  const [amount, setAmount] = useState(0)
  const debounceChoice = useDebounce(choice, 500)
  const debounceAmount = useDebounce(amount, 500)

  const { address } = useAccount()
  const { allowance, refetch } = useAllowance(address, MAIDS_PREDICTION_CONTRACT_ADDRESS)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const { data: userInfo } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getUserInfo',
    args: [address, predictionInfo.id],
    cacheOnBlock: true,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  const predictionConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'predict',
    args: [predictionInfo.id, parseEther(`${debounceAmount}`), debounceChoice],
    enabled: Boolean(allowance) && Boolean(debounceAmount),
  }).config
  const prediction = useContractWrite({ ...predictionConfig })

  const approveConfig = usePrepareContractWrite({
    ...maidsContractConfig,
    functionName: 'approve',
    args: [MAIDS_PREDICTION_CONTRACT_ADDRESS, '0xffffffffffffffffffffffffffffffffffffffffffffffffff'],
    enabled: address !== undefined,
  }).config
  const approve = useContractWrite({
    ...approveConfig,
  })

  const approveTx = useWaitForTransaction({
    hash: approve.data?.hash,
  })

  const predictionTx = useWaitForTransaction({
    hash: prediction.data?.hash,
    onSuccess() {
      openSnackbar()
    },
  })

  useEffect(() => {
    const refetchAllowance = async () => {
      if (address !== undefined) {
        await refetch()
      }
    }
    void refetchAllowance()
  }, [approveTx.status, predictionTx.status, refetch, address])

  const handleChoice = () => {
    if (allowance) {
      prediction.write?.()
    } else {
      approve.write?.()
    }
  }

  const buttonMessage = () => {
    if (userInfo?.isPredicted) {
      return 'Already Predicted'
    } else if (allowance && allowance > Number(debounceAmount)) {
      return 'Vote'
    } else {
      return 'Approve $MAIDS'
    }
  }

  return (
    <>
      <Typography variant='h4'>Choices</Typography>
      <FormControl fullWidth>
        <RadioGroup
          value={PredictionText.choices[0]}
          onChange={(event) => setChoice(PredictionText.choices.indexOf(event.target.value))}>
          {PredictionText.choices.map((choice) => (
            <FormControlLabel key={choice} value={choice} control={<Radio />} label={choice} />
          ))}
        </RadioGroup>
      </FormControl>
      <TextField
        {...register('amount', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: Amount'
        variant='standard'
        size='medium'
        onChange={(e) => setAmount(Number(e.target.value))}
        InputProps={{
          endAdornment: <InputAdornment position='start'>$MAIDS</InputAdornment>,
        }}
        error={'amount' in errors}
        helperText={errors.amount?.message}
        type='number'
        fullWidth
      />
      <LoadingButton
        variant='contained'
        onClick={handleSubmit(handleChoice)}
        loading={approve.isLoading || prediction.isLoading || approveTx.isLoading || predictionTx.isLoading}
        disabled={userInfo?.isPredicted}
        sx={{ fontSize: '20px', border: '1px solid', mt: '20px' }}
        fullWidth>
        {buttonMessage()}
      </LoadingButton>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
        Successfully predict!
      </Snackbar>
    </>
  )
}

export default PredictionForm
