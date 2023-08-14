import Box from '@mui/material/Box'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import getAllUserInfo from '@/app/api/user/getAllUserInfo'
import CenteredTabs from './TabPanel'
import NFTHolderTable from './NFTHolderTable'
import MaidsHolderTable from './MaidsHolderTable'

const Ranking = async () => {
  const userInfos = await getAllUserInfo()

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={3}
          position='fixed'
          width='30%'
          height='100vh'
          display='flex'
          flexDirection='column'
          justifyContent='flex-end'>
          <Image
            src='/images/maid_velo.png'
            alt='maids'
            width={500}
            height={800}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ ml: '25%' }}>
          <Container>
            <Typography
              align='center'
              variant='h1'
              color='hotpink'
              sx={{ typography: { sm: 'h1', xs: 'h4' }, mb: '20px' }}>
              Holder Ranking
            </Typography>
            <Box sx={{ width: '100%', bgcolor: '#333333' }}>
              <CenteredTabs labels={['NFT', '$MAIDS']}>
                <NFTHolderTable userInfos={userInfos} />
                <MaidsHolderTable userInfos={userInfos} />
              </CenteredTabs>
            </Box>
          </Container>
        </Grid>
        <Grid
          item
          xs={3}
          position='fixed'
          width='30%'
          height='100vh'
          display='flex'
          flexDirection='column'
          justifyContent='flex-end'
          sx={{ ml: '75%' }}>
          <Image
            src='/images/maid_rita.png'
            alt='maids'
            width={500}
            height={800}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default Ranking

export const metadata: Metadata = {
  title: 'Ranking',
}
