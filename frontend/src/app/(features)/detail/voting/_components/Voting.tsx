import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { getAsset } from '@/server/asset/query'
import { NFTImage } from '../../_components/NFTImage'
import { NFTInfo } from '../../_components/NFTInfo'
import { Induction } from './Induction'
import { VotingInfo } from './VotingInfo'

const VotingForm = dynamic(() => import('./VotingForm'), { ssr: false })

type VotingProps = {
  id: number
}

const Voting = ({ id }: VotingProps) => (
  <div className='container mx-auto my-8 max-w-6xl'>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
      <div className='col-span-1'>
        <Suspense fallback={<Skeleton className='h-[800px] w-[500px]' />}>
          <NFTImage id={id} />
        </Suspense>
      </div>

      <div className='flex flex-col gap-6'>
        <Suspense fallback={<Skeleton />}>
          <NFTInfo id={id} />
        </Suspense>

        <VotingInfo id={Number(id)} />

        <VotingForm id={Number(id)} />

        <Induction />
      </div>
    </div>
  </div>
)

export default Voting

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
  const meta = await getAsset(params.id)

  return {
    title: 'Detail',
    openGraph: {
      title: meta.name,
      siteName: 'CryptoMaids Made in Maids',
      images: [
        {
          url: meta.image,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.name,
      creator: '@CryptoMaids',
      images: [meta.image],
    },
  }
}
