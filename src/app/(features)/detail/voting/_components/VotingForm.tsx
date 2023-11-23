'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import useVote from '@/app/(features)/detail/voting/_hooks/useVote'
import { TwitterAlert } from '@/app/_components/Elements/TwitterAlert'
import useVotingForm, { VotingForm, SubmitErrorHandler, SubmitHandler } from '../_hooks/useVotingForm'

type VotingFormProps = {
  id: number
}

const VotingForm = ({ id }: VotingFormProps) => {
  const matches = useMediaQuery('(min-width: 560px)')
  const { handleSubmit, errors, fieldValues }: VotingForm = useVotingForm()

  const handleValid: SubmitHandler = () => {
    voteOrApprove()
  }
  const handleInvalid: SubmitErrorHandler = () => console.log('handleInvalid')

  const { amount, updateAmount, voteOrApprove, isLoading, allowance, Snackbar } = useVote(id)

  return (
    <>
      <TextField
        {...fieldValues.num}
        id='outlined-required'
        label='Required: voteAmounts'
        variant='standard'
        size='medium'
        onChange={(e) => updateAmount(Number(e.target.value))}
        error={'num' in errors}
        helperText={errors.num?.message}
        type='number'
        style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
      />
      <Grid container>
        <Grid item xs={12}>
          <LoadingButton
            size='large'
            onClick={() => handleSubmit(handleValid, handleInvalid)}
            loading={isLoading}
            sx={{ fontSize: '30px', border: '1px solid', mt: '20px' }}
            fullWidth>
            {allowance && allowance > Number(amount) ? `Vote` : `Approve $MAIDS`}
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
