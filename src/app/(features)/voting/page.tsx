import Container from '@mui/material/Container'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Top5 } from './Top5'
import { Voting } from './Voting'

// eslint-disable-next-line react/function-component-definition
export default function VotingTop() {
  return (
    <>
      <Container>
        <Grid container justifyContent='center' alignContent='center' mt='20px' mb='10px'>
          <Typography variant='h1' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
            CryptoMaids VOTING
          </Typography>
        </Grid>
        <Suspense
          fallback={
            <Grid container justifyContent='center' alignContent='center' mt='20px'>
              <CircularProgress />
            </Grid>
          }>
          <Top5 />
        </Suspense>
        <Voting />
      </Container>
      <Footer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Voting',
}
