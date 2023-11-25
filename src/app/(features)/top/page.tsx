import { Suspense } from 'react'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import RecentlyUpdatedProfiles from './_components/RecentlyUpdatedProfiles'
import TopCard from './_components/TopCard'

const Page = () => (
  <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center'>
      <TopCard
        title='MARKET'
        color='text-pink-500'
        image='/images/mogm.png'
        description='You can spend $MAIDS tokens to mint exclusive NFT'
        link='/market'
      />
      <TopCard
        title='STAKING'
        color='cyan'
        image='/images/staking.png'
        description='Hold CryptoMaids earn $MAIDS'
        link='https://made-in-maids.cryptomaids.tokyo/'
      />
      <TopCard
        title='VOTING'
        color='orange'
        image='/images/voting.png'
        description='Let’s make your maid NO.1'
        link='/voting'
      />
      <TopCard
        title='RANKING'
        color='gold'
        image='/images/ranking.png'
        description='CryptoMaids NFT & $MAIDS holder ranking'
        link='/ranking'
      />
      <TopCard
        title='PREDICTION'
        color='lightgreen'
        image='/images/prediction.png'
        description='Predict the CryptoMaids event results'
        link='/prediction'
      />
    </div>
    <Suspense fallback={<CenteringCircularProgress />}>
      <RecentlyUpdatedProfiles />
    </Suspense>
    <br />
  </>
)

export default Page
