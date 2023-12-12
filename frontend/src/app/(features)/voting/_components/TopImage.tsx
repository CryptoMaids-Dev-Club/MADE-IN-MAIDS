'use client'

import Image from 'next/image'
import NextLink from 'next/link'
import { Typography } from '@/components/ui/typography'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { TopAsset } from '@/app/api/voting/[slug]/voting'

type TopImageProps = {
  topAssets: TopAsset[]
}

export const TopImage = ({ topAssets }: TopImageProps) => {
  topAssets.sort((a, b) => a.rank - b.rank)

  const sortedTopAssets = [...topAssets]
  const matches = useMediaQuery('(min-width: 560px)')
  if (matches) {
    ;[sortedTopAssets[1], sortedTopAssets[0]] = [topAssets[0], topAssets[1]]
  }

  const top3 = sortedTopAssets.slice(0, 3)
  const top5 = sortedTopAssets.slice(3, 5)

  return (
    <>
      <div className='grid grid-cols-1 items-center justify-center sm:grid-cols-3'>
        {top3.map((asset) => (
          <div key={asset.name}>
            <Image src={`/images/${asset.rank}.png`} alt='rank' height='360' width='370' />
            <NextLink href={`/detail/${asset.id}`}>
              <div className='relative overflow-hidden bg-cover bg-no-repeat'>
                <Image
                  className='transition duration-300 hover:scale-110'
                  src={asset.external_url}
                  width='340'
                  height='576'
                  alt='maids'
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </NextLink>
            <Typography variant='h3' className='text-center text-yellow-500'>
              {`Number of Votes:${asset.amount}`}
            </Typography>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 items-start justify-center sm:grid-cols-2'>
        {top5.map((asset) => (
          <div key={asset.name} className='mx-auto'>
            <Image src={`/images/${asset.rank}.png`} alt='rank' height='360' width='370' />
            <NextLink href={`/detail/${asset.id}`}>
              <div className='relative overflow-hidden bg-cover bg-no-repeat'>
                <Image
                  className='transition duration-300 hover:scale-110'
                  src={asset.external_url}
                  width='340'
                  height='576'
                  alt='maids'
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </NextLink>
            <Typography variant='h3' className='text-center text-yellow-500'>
              {`Number of Votes:${asset.amount}`}
            </Typography>
          </div>
        ))}
      </div>
    </>
  )
}

export default TopImage
