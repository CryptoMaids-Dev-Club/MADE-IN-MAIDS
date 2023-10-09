import { Metadata } from 'next'
import PredictionList from './_components/PredictionList'
import RewardRanking from './_components/RewardRanking'

const PredictionPage = () => {
  return (
    <>
      <PredictionList />
      <RewardRanking />
    </>
  )
}

export default PredictionPage

export const metadata: Metadata = {
  title: 'Prediction',
}
