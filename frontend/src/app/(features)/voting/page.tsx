import { Metadata } from 'next'
import Voting from './_components/Voting'

const VotingPage = () => <Voting />

export default VotingPage

export const metadata: Metadata = {
  title: 'Voting',
}
