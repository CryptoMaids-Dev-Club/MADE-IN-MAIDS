import { Suspense } from 'react'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import { Typography } from '@/components/ui/typography'
import RecentlyUpdatedProfiles from './RecentlyUpdatedProfiles'
import TopCard from './TopCard'

const Top = () => (
  <div>
    <div className='mx-10 grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <TopCard
        title='MARKET'
        color='text-pink-500'
        image='/images/mogm.png'
        description='You can spend $MAIDS tokens to mint exclusive NFT'
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
    </div>
    <div className='m-10 pb-4'>
      <Typography variant='h1'>Recently Updated Profiles</Typography>
      <Suspense fallback={<CenteringCircularProgress />}>
        <RecentlyUpdatedProfiles />
      </Suspense>
    </div>
  </div>
)

export default Top
