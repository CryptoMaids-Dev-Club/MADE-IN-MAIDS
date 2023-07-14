import Container from '@mui/material/Container'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import { Top5 } from './Top5'
import { Voting } from './Voting'

const VotingTop = () => (
  <>
    <Container>
      <Top5 />
      <Voting />
    </Container>
    <Footer />
  </>
)

export const metadata: Metadata = {
  title: 'Voting',
}

export default VotingTop
