import { Suspense } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
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

    <Box sx={{ mt: '50px' }}>
      <Stack alignItems='center' spacing={2}>
        <Divider flexItem sx={{ bgcolor: 'primary.light' }} />

        <Typography variant='h1' color='hotpink'>
          VOTING
        </Typography>
        <VotingTransitionForm />

        <Divider flexItem sx={{ bgcolor: 'primary.light' }} />
      </Stack>
      <br />
    </Box>
  </Container>
)

export default Voting

export const metadata: Metadata = {
  title: 'Voting',
}
