import { Skeleton } from '@/components/ui/skeleton'

const PredictionListSkelton = () => (
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

export default PredictionListSkelton
