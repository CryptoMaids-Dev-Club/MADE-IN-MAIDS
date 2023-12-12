import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import MaidsProfileWrapper from './MaidsProfileWrapper'
import { NFTImage } from './NFTImage'

type DetailProps = {
  id: number
}

const Detail = ({ id }: DetailProps) => (
  <div className='container mx-auto my-8 max-w-6xl'>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
      <div className='col-span-1'>
        <Suspense fallback={<Skeleton className='h-[800px] w-[500px]' />}>
          <NFTImage id={id} />
        </Suspense>
      </div>
      <div className='col-span-1'>
        <Suspense fallback={<Skeleton />}>
          <MaidsProfileWrapper id={id} />
        </Suspense>
      </div>
    </div>
  </div>
)

export default Detail
