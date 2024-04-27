import { Suspense } from 'react'
import PredictionList, { PredictionListSkelton } from '@/app/[lang]/(features)/prediction/_components/PredictionList'
import RewardRanking from '@/app/[lang]/(features)/prediction/_components/RewardRanking'
import { CenteringCircularProgress } from '@/app/[lang]/_components/Elements/CenteringCircularProgress'
import { Typography } from '@/components/ui/typography'

const Prediction = ({ lang }: { lang: string }) => (
  <div className='container mx-auto max-w-7xl pb-12'>
    <Typography variant='h1' className='my-2 text-center text-pink-500'>
      CryptoMaids Prediction
    </Typography>
    <Suspense fallback={<PredictionListSkelton />}>
      <PredictionList lang={lang} />
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
