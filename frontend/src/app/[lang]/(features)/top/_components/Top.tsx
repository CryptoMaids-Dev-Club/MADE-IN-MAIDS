import { Suspense } from 'react'
import { getTranslation } from '@/app/i18n/server'
import { Typography } from '@/components/ui/typography'
import RecentlyUpdatedProfiles, { RecentlyUpdatedProfilesSkeleton } from './RecentlyUpdatedProfiles'
import TopCard from './TopCard'

type TopProps = {
  lang: string
}

const Top = async ({ lang }: TopProps) => {
  const { t } = await getTranslation(lang)

  return (
    <div>
      <div className='mx-10 grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <TopCard
          title='MARKET'
          color='text-pink-500'
          image='/images/mogm.png'
          description={t('top:market')}
          link='/market'
        />
        <TopCard
          title='STAKING'
          color='text-blue-400'
          image='/images/staking.png'
          description='Hold CryptoMaids earn $MAIDS'
          link='https://made-in-maids.cryptomaids.tokyo/'
        />
        <TopCard
          title='VOTING'
          color='text-orange-500'
          image='/images/voting.png'
          description='Let’s make your maid NO.1'
          link='/voting'
        />
        <TopCard
          title='RANKING'
          color='text-yellow-500'
          image='/images/ranking.png'
          description='CryptoMaids NFT & $MAIDS holder ranking'
          link='/ranking'
        />
        <TopCard
          title='PREDICTION'
          color='text-green-500'
          image='/images/prediction.png'
          description='Predict the CryptoMaids event results'
          link='/prediction'
        />
        <TopCard
          title='Lottery'
          color='text-green-500'
          image='/images/lottery.png'
          description='Let’s participate in the lottery event!'
          link='/lottery'
        />
      </div>
      <div className='m-10 pb-4'>
        <Typography variant='h1' className='mb-3'>
          Recently Updated Profiles
        </Typography>
        <Suspense fallback={<RecentlyUpdatedProfilesSkeleton />}>
          <RecentlyUpdatedProfiles />
        </Suspense>
      </div>
    </div>
  )
}

export default Top
