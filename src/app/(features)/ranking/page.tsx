import { Metadata } from 'next'
import Ranking from './_components/Ranking'

const RankingPage = () => <Ranking />

export default RankingPage

export const metadata: Metadata = {
  title: 'Ranking',
}

export const dynamic = 'force-dynamic'
