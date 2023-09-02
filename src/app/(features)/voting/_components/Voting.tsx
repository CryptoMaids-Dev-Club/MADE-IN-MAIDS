import Container from '@mui/material/Container'
import { Metadata } from 'next'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Top5 } from './Top5'
import { VotingTransitionForm } from './VotingTransitionForm'

const Voting = () => (
  <Container>
    <Typography variant='h1' align='center' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
      CryptoMaids VOTING
    </Typography>
    <Suspense
      fallback={
        <Grid container justifyContent='center' alignContent='center' mt='20px'>
          <CircularProgress />
        </Grid>
      }>
      <Top5 />
    </Suspense>
    <VotingTransitionForm />
  </Container>
)

export default Voting

export const metadata: Metadata = {
  title: 'Voting',
}
