'use client'

// import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import usePredict from '@/app/(features)/prediction/_hooks/usePredict'
import { ButtonLoading } from '@/components/ui/loadingButton'
import usePredictionForm, { PredictionForm, SubmitErrorHandler, SubmitHandler } from '../_hooks/usePredictionForm'
import type { Prediction, PredictionText } from '@/app/api/prediction/prediction'

type PredictionFormProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const PredictionForm = ({ predictionInfo, predictionText: PredictionText }: PredictionFormProps) => {
  const { handleSubmit, errors, fieldValues }: PredictionForm = usePredictionForm()

  const { isPredicted, isLoading, choice, buttonMessage, predictOrApprove, updateChoice, updateAmount, Snackbar } =
    usePredict(predictionInfo.id)

  const handleValid: SubmitHandler = () => {
    predictOrApprove()
  }
  const handleInvalid: SubmitErrorHandler = () => console.log('handleInvalid')

  return (
    <>
      <FormControl fullWidth>
        <RadioGroup
          value={PredictionText.choices[choice]}
          onChange={(event) => updateChoice(PredictionText.choices.indexOf(event.target.value))}>
          {PredictionText.choices.map((choice) => (
            <FormControlLabel key={choice} value={choice} control={<Radio />} label={choice} />
          ))}
        </RadioGroup>
      </FormControl>
      <TextField
        {...fieldValues.amount}
        id='outlined-required'
        label='Required: Amount'
        variant='standard'
        size='medium'
        onChange={(event) => updateAmount(Number(event.target.value))}
        InputProps={{
          endAdornment: <InputAdornment position='start'>$MAIDS</InputAdornment>,
        }}
        error={'amount' in errors}
        helperText={errors.amount?.message}
        type='number'
        fullWidth
      />
      <ButtonLoading
        loading={isLoading}
        onClick={() => handleSubmit(handleValid, handleInvalid)}
        style={{ width: '300px' }}>
        {buttonMessage}
      </ButtonLoading>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
        Successfully predict!
      </Snackbar>
    </>
  )
}

export default PredictionForm
