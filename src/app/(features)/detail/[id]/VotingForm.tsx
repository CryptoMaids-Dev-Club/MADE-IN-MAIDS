'use client'

import { MAIDS_VOTING_CONTRACT_ADDRESS, maidsContractConfig, votingContractConfig } from '@/config'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { TwitterAlert } from '@/app/_components/Elements/TwitterAlert'
import { useAllowance } from '@/hooks/useAllowance'

type VotingFormProps = {
  id: number
}

export const VotingForm = ({ id }: VotingFormProps) => {
  const matches = useMediaQuery('(min-width: 560px)')
  const [open, setOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const validationRules = {
    votes: {
      required: '投票数を入力してください',
    },
  }
  type Inputs = {
    votes: number
  }
  const { control, handleSubmit } = useForm<Inputs>()

  const [amount, setAmount] = useState('')
  const debounceAmount = useDebounce(amount, 500)
  const { address } = useAccount()

  const { allowance, refetch } = useAllowance(address, MAIDS_VOTING_CONTRACT_ADDRESS)

  const votingConfig = usePrepareContractWrite({
    ...votingContractConfig,
    functionName: 'vote',
    args: debounceAmount ? [id, parseEther(`${Number(debounceAmount)}`)] : [id, 0],
    enabled: Boolean(allowance) && Boolean(debounceAmount),
  }).config
  const vote = useContractWrite({ ...votingConfig })

  const approveConfig = usePrepareContractWrite({
    ...maidsContractConfig,
    functionName: 'approve',
    args: [MAIDS_VOTING_CONTRACT_ADDRESS, '0xffffffffffffffffffffffffffffffffffffffffffffffffff'],
    enabled: address !== undefined,
  }).config
  const approve = useContractWrite({
    ...approveConfig,
  })

  const approveTx = useWaitForTransaction({
    hash: approve.data?.hash,
  })

  const voteTx = useWaitForTransaction({
    hash: vote.data?.hash,
    onSuccess() {
      setOpen(true)
    },
  })

  useEffect(() => {
    const refetchAllowance = async () => {
      if (address !== undefined) {
        await refetch()
      }
    }
    void refetchAllowance()
  }, [approveTx.status, voteTx.status, refetch, address])

  const onSubmit: SubmitHandler<Inputs> = () => {
    try {
      if (allowance) {
        if (Number(debounceAmount) <= 0) return
        vote.write?.()
      } else {
        approve.write?.()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Controller
        name='votes'
        control={control}
        rules={validationRules.votes}
        defaultValue={0}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id='outlined-required'
            label='Required: voteAmounts'
            variant='standard'
            size='medium'
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type='number'
            style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
          />
        )}
      />
      <Grid container>
        <Grid item xs={12}>
          <LoadingButton
            size='large'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit(onSubmit)}
            loading={approve.isLoading || vote.isLoading || approveTx.isLoading || voteTx.isLoading}
            sx={{ fontSize: '30px', border: '1px solid', mt: '20px' }}
            fullWidth>
            {allowance ? `Vote` : `Approve $MAIDS`}
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={10000}
            onClose={handleClose}>
            <Alert icon={false} onClose={handleClose} variant='filled' severity='success' sx={{ width: '100%' }}>
              <TwitterAlert
                message={`Voted for CryptoMaids #${id}! Share`}
                title={`Voted for CryptoMaids #${id}!`}
                url={`https://made-in-maids.vercel.app/detail/${id}`}
                hashtags={['CryptoMaids']}
              />
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  )
}

export default VotingForm
