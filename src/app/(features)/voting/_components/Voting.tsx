import { Suspense } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import { Top5 } from './Top5'
import { VotingTransitionForm } from './VotingTransitionForm'

const Voting = () => (
  <Container>
    <Typography variant='h1' align='center' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
      CryptoMaids VOTING
    </Typography>
    <Suspense fallback={<CenteringCircularProgress />}>
      <Top5 />
    </Suspense>
    <VotingTransitionForm />
  </Container>
)

export default Voting

export const metadata: Metadata = {
  title: 'Voting',
}
