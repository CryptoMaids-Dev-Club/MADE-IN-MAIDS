import { Suspense } from 'react'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import { Typography } from '@/components/ui/typography'
import PredictionList, { PredictionListSkelton } from './PredictionList'
import RewardRanking from './RewardRanking'

const Prediction = () => (
  <div className='container mx-auto max-w-7xl'>
    <Typography variant='h1' className='my-2 text-center text-pink-500'>
      CryptoMaids Prediction
    </Typography>
    <Suspense fallback={<PredictionListSkelton />}>
      <PredictionList />
    </Suspense>
    <Typography variant='h1' className='my-2 text-center text-pink-500'>
      Reward Ranking
    </Typography>
    <Suspense fallback={<CenteringCircularProgress />}>
      <RewardRanking />
    </Suspense>
  </div>
)

export default Prediction
