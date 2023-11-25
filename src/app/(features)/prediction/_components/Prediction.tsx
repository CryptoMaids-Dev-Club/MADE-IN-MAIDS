import { Suspense } from 'react'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import { Typography } from '@/components/ui/Typography'
import PredictionList from './PredictionList'
import PredictionListSkelton from './PredictionListSkeleton'
import RewardRanking from './RewardRanking'

const Prediction = () => (
  <div className='container mx-auto max-w-7xl'>
    <Typography variant='h1' className='text-pink-500 text-center my-2'>
      CryptoMaids Prediction
    </Typography>
    <Suspense fallback={<PredictionListSkelton />}>
      <PredictionList />
    </Suspense>
    <Typography variant='h1' className='text-pink-500 text-center my-2'>
      Reward Ranking
    </Typography>
    <Suspense fallback={<CenteringCircularProgress />}>
      <RewardRanking />
    </Suspense>
  </div>
)

export default Prediction
