import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
import MaidsProfileWrapper from './MaidsProfileWrapper'
import { NFTImage } from './NFTImage'

type DetailProps = {
  id: number
}

const Detail = ({ id }: DetailProps) => {
  const style = {
    width: '100%',
    boxShadow: 12,
    p: 4,
  }

  return (
    <div className='container mx-auto max-w-6xl'>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <Suspense fallback={<Skeleton className='w-[500px] h-[800px]' />}>
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
}

export default Detail
