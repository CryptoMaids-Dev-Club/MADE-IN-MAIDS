import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import RecentlyUpdatedProfiles from './_components/RecentlyUpdatedProfiles'
import TopCard from './_components/TopCard'

const Page = () => (
  <>
    <Grid container justifyContent='center' alignItems='center' spacing={3}>
      <Grid item justifyContent='center' alignItems='center'>
        <TopCard
          title='MARKET'
          color='hotpink'
          image='/images/mogm.png'
          description='You can spend $MAIDS tokens to mint exclusive NFT'
          link='/market'
        />
      </Grid>
      <Grid item>
        <TopCard
          title='STAKING'
          color='cyan'
          image='/images/staking.png'
          description='Hold CryptoMaids earn $MAIDS'
          link='https://made-in-maids.cryptomaids.tokyo/'
        />
      </Grid>
      <Grid item>
        <TopCard
          title='VOTING'
          color='orange'
          image='/images/voting.png'
          description='Let’s make your maid NO.1'
          link='/voting'
        />
      </Grid>
      <Grid item>
        <TopCard
          title='RANKING'
          color='gold'
          image='/images/ranking.png'
          description='CryptoMaids NFT & $MAIDS holder ranking'
          link='/ranking'
        />
      </Grid>
      <Grid item>
        <TopCard
          title='PREDICTION'
          color='lightgreen'
          image='/images/prediction.png'
          description='Predict the CryptoMaids event results'
          link='/prediction'
        />
      </Grid>
    </Grid>
    <Grid sx={{ padding: '30px' }}>
      <Suspense fallback={<Skeleton variant='circular' width={40} height={40} />}>
        <RecentlyUpdatedProfiles />
      </Suspense>
    </Grid>
    <br />
  </>
)

export default Page
