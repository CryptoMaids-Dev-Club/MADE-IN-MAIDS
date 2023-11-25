import { Skeleton } from '@/components/ui/Skeleton'

const PredictionListSkelton = () => (
  <div className='box-border border-4 border-pink-500 border-dashed rounded-2xl p-4'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center'>
      <div>
        <Skeleton className='w-96 h-40' />
      </div>
      <div>
        <Skeleton className='w-96 h-40' />
      </div>
      <div>
        <Skeleton className='w-96 h-40' />
      </div>
    </div>
  </div>
)

export default PredictionListSkelton
