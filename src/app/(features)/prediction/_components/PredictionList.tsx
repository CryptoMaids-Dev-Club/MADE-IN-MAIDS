import { Suspense } from 'react'
import getAllPredictions from '@/app/api/prediction/getAllPredictions'
import { Skeleton } from '@/components/ui/Skeleton'
import PredictionInfoCard from './PredictionInfoCard'
import type { Prediction } from '@/app/api/prediction/prediction'

const PredictionList = async () => {
  const predictionInfos = (await getAllPredictions()) as Prediction[]

  return (
    <div className='box-border border-4 border-pink-500 border-dashed rounded-2xl p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center'>
        {predictionInfos.reverse().map((predictionInfo) => (
          <div key={predictionInfo.id}>
            <Suspense fallback={<Skeleton className='w-96 h-40' />}>
              <PredictionInfoCard predictionInfo={predictionInfo} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PredictionList
