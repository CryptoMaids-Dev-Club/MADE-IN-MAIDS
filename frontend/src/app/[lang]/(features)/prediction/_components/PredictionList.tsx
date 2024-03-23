import { Suspense } from 'react'
import { getAllPredictions } from '@/app/[lang]/(features)/prediction/_api/query'
import { Skeleton } from '@/components/ui/skeleton'
import PredictionInfoCard from './PredictionInfoCard'
import type { Prediction } from '@/app/[lang]/(features)/prediction/_types'

const PredictionList = async () => {
  const predictionInfos = (await getAllPredictions()) as Prediction[]

  return (
    <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-4'>
      <div className='grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {predictionInfos.reverse().map((predictionInfo) => (
          <div key={predictionInfo.id}>
            <Suspense fallback={<Skeleton className='h-40 w-full' />}>
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
        <Skeleton className='h-40 w-full' />
      </div>
      <div>
        <Skeleton className='h-40 w-full' />
      </div>
      <div>
        <Skeleton className='h-40 w-full' />
      </div>
    </div>
  </div>
)
