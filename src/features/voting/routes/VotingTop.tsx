import { Container } from '@mui/material'
import { Footer } from '@/app/components/Footer'
import { Top5 } from '../components/Top5'
import { Voting } from '../components/Voting'

export const VotingTop = () => (
  <>
    <Container>
      <Top5 />
      <Voting />
    </Container>
    <Footer />
  </>
)

export default VotingTop
