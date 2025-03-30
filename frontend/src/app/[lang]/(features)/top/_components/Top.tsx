import { getTranslation } from '@/app/i18n/server'
import { Typography } from '@/components/ui/typography'
import { Suspense } from 'react'
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
          image='/images/market/mogm.png'
          description={t('top:market')}
          link={`/${lang}/market`}
        />
        <TopCard
          title='STAKING'
          color='text-blue-400'
          image='/images/staking/staking.png'
          description={t('top:staking')}
          link={`/${lang}/staking`}
        />
        <TopCard
          title='VOTING'
          color='text-orange-500'
          image='/images/voting/voting.png'
          description={t('top:voting')}
          link={`/${lang}/voting`}
        />
        <TopCard
          title='RANKING'
          color='text-yellow-500'
          image='/images/ranking/ranking.png'
          description={t('top:ranking')}
          link={`/${lang}/ranking`}
        />
        <TopCard
          title='PREDICTION'
          color='text-green-500'
          image='/images/prediction/prediction.png'
          description={t('top:prediction')}
          link={`/${lang}/prediction`}
        />
        <TopCard
          title='Lottery'
          color='text-green-500'
          image='/images/lottery/lottery.png'
          description={t('top:lottery')}
          link={`/${lang}/lottery`}
        />
      </div>
      <div className='m-10 pb-4'>
        <Typography variant='h1' className='mb-3'>
          Recently Updated Profiles
        </Typography>
        <Suspense fallback={<RecentlyUpdatedProfilesSkeleton />}>
          <RecentlyUpdatedProfiles lang={lang} />
        </Suspense>
      </div>
    </div>
  )
}

export default Top
