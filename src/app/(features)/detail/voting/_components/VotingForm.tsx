'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { TwitterAlert } from '@/app/_components/Elements/TwitterAlert'
import { MAIDS_VOTING_CONTRACT_ADDRESS, maidsContractConfig, votingContractConfig } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { FormSchema, formSchema } from '../schema'

type VotingFormProps = {
  id: number
}

export const VotingForm = ({ id }: VotingFormProps) => {
  const matches = useMediaQuery('(min-width: 560px)')

  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const [amount, setAmount] = useState(0)
  const debounceAmount = useDebounce(amount, 500)
  const { address } = useAccount()

  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, MAIDS_VOTING_CONTRACT_ADDRESS)
  const { approve, approveTx } = useApprove(
    maidsContractConfig.address,
    address ?? `0x${''}`,
    MAIDS_VOTING_CONTRACT_ADDRESS
  )

  const votingConfig = usePrepareContractWrite({
    ...votingContractConfig,
    functionName: 'vote',
    args: debounceAmount ? [id, parseEther(`${Number(debounceAmount)}`)] : [id, 0],
    enabled: Boolean(allowance) && Boolean(debounceAmount),
  }).config
  const vote = useContractWrite({ ...votingConfig })

  const voteTx = useWaitForTransaction({
    hash: vote.data?.hash,
    onSuccess() {
      openSnackbar()
      refetch()
    },
  })

  const onSubmit = () => {
    try {
      if (allowance && allowance > Number(debounceAmount)) {
        if (Number(debounceAmount) <= 0) return
        vote.write?.()
      } else {
        approve.write?.()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <TextField
        {...register('num', { valueAsNumber: true })}
        id='outlined-required'
        label='Required: voteAmounts'
        variant='standard'
        size='medium'
        onChange={(e) => setAmount(Number(e.target.value))}
        error={'num' in errors}
        helperText={errors.num?.message}
        type='number'
        style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
      />
      <Grid container>
        <Grid item xs={12}>
          <LoadingButton
            size='large'
            onClick={handleSubmit(onSubmit)}
            loading={approve.isLoading || vote.isLoading || approveTx.isLoading || voteTx.isLoading}
            sx={{ fontSize: '30px', border: '1px solid', mt: '20px' }}
            fullWidth>
            {allowance && allowance > Number(debounceAmount) ? `Vote` : `Approve $MAIDS`}
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={10000}>
            <TwitterAlert
              message={`Voted for CryptoMaids #${id}! Share`}
              title={`Voted for CryptoMaids #${id}!`}
              url={`https://made-in-maids.vercel.app/detail/${id}`}
              hashtags={['CryptoMaids']}
            />
          </Snackbar>
        </Grid>
      </Grid>
    </>
  )
}

export default VotingForm
