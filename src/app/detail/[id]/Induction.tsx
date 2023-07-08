import { Grid, Link, Typography } from '@mui/material'

export const Induction = () => (
  <Grid item xs={12}>
    <Typography variant='h6' mt='50px'>
      You don&apos;t have any $MAIDS? You can claim it below
    </Typography>
    <Link variant='h4' href='https://made-in-maids.cryptomaids.tokyo/'>
      CryptoMaids Staking
    </Link>
  </Grid>
)

export default Induction
