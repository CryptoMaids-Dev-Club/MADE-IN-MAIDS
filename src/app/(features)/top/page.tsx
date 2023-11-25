import { Suspense } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import RecentlyUpdatedProfiles from './_components/RecentlyUpdatedProfiles'
import TopCard from './_components/TopCard'

const Page = () => (
  <>
    <Stack direction='row' useFlexGap flexWrap='wrap' justifyContent='center' alignItems='center' spacing={3}>
      <div>
        <TopCard
          title='MARKET'
          color='hotpink'
          image='/images/mogm.png'
          description='You can spend $MAIDS tokens to mint exclusive NFT'
          link='/market'
        />
      </div>

      <div>
        <TopCard
          title='STAKING'
          color='cyan'
          image='/images/staking.png'
          description='Hold CryptoMaids earn $MAIDS'
          link='https://made-in-maids.cryptomaids.tokyo/'
        />
      </div>

      <div>
        <TopCard
          title='VOTING'
          color='orange'
          image='/images/voting.png'
          description='Let’s make your maid NO.1'
          link='/voting'
        />
      </div>

      <div>
        <TopCard
          title='RANKING'
          color='gold'
          image='/images/ranking.png'
          description='CryptoMaids NFT & $MAIDS holder ranking'
          link='/ranking'
        />
      </div>

      <div>
        <TopCard
          title='PREDICTION'
          color='lightgreen'
          image='/images/prediction.png'
          description='Predict the CryptoMaids event results'
          link='/prediction'
        />
      </div>
    </Stack>
    <Box sx={{ padding: '30px' }}>
      <Suspense fallback={<Skeleton variant='circular' width={40} height={40} />}>
        <RecentlyUpdatedProfiles />
      </Suspense>
    </Box>
  </>
)

export default Page
