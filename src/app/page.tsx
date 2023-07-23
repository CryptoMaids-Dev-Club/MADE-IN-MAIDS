import { Grid } from '@mui/material'
import { Footer } from '@/app/_components/Footer'
import TopCard from './TopCard'

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
          color='gold'
          image='/images/voting.png'
          description='Let’s make your maid NO.1'
          link='/voting'
        />
      </Grid>
    </Grid>
    <Footer />
  </>
)

export default Page
