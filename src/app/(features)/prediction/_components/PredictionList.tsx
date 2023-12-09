import { Suspense } from 'react'
import getAllPredictions from '@/app/api/prediction/getAllPredictions'
import { Skeleton } from '@/components/ui/skeleton'
import PredictionInfoCard from './PredictionInfoCard'
import type { Prediction } from '@/app/api/prediction/prediction'

const PredictionList = async () => {
  const predictionInfos = (await getAllPredictions()) as Prediction[]

  return (
    <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-4'>
      <div className='grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {predictionInfos.reverse().map((predictionInfo) => (
          <div key={predictionInfo.id}>
            <Suspense fallback={<Skeleton className='h-40 w-96' />}>
              <PredictionInfoCard predictionInfo={predictionInfo} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PredictionList

export const PredictionListSkelton = () => (
  <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-4'>
    <div className='grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <div>
        <Skeleton className='h-40 w-96' />
      </div>
      <div>
        <Skeleton className='h-40 w-96' />
      </div>
      <div>
        <Skeleton className='h-40 w-96' />
      </div>
    </div>
  </div>
)
