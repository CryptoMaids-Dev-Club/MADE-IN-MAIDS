/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { MarketItemInfo } from '../types'
import PurchaseButton from './PurchaseButton'

type PurchaseFormProps = {
  item: MarketItemInfo
}

export const PurchaseForm = ({ item }: PurchaseFormProps) => {
  const [amount, setAmount] = useState(1)
  const [checked, setChecked] = useState(false)
  const [differentAddress, setAddress] = useState('')

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setAddress('')
  }

  const handleChange = (event: SelectChangeEvent<number>) => {
    setAmount(Number(event.target.value))
  }

  const range = Number(item.supply) > 10 ? 10 : Number(item.supply)

  return (
    <Grid container alignItems='center' justifyContent='center' sx={{ mt: '20px' }}>
      {Number(item.supply) <= 0 ? (
        <Typography variant='h5' component='span' sx={{ color: 'black' }}>
          SOLD OUT!
        </Typography>
      ) : (
        <Grid container>
          <Grid item xs={10}>
            <PurchaseButton item={item} amount={amount} differentAddress={differentAddress} />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Amount</InputLabel>
              <Select value={amount} label='Amount' onChange={handleChange} sx={{ height: '39px' }}>
                {[...Array(range)].map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mt: '5px' }}>Mint to a different wallet</Typography>
          </Grid>
          <Grid item xs={12}>
            <Switch checked={checked} onChange={handleCheckChange} />
          </Grid>
          {checked && (
            <Grid item xs={12}>
              <TextField
                label='Address'
                variant='outlined'
                size='small'
                fullWidth
                required
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress(event.target.value)
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default PurchaseForm
