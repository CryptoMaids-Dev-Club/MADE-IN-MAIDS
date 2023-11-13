import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import MaidsHolderTable from './MaidsHolderTable'
import NFTHolderTable from './NFTHolderTable'
import CenteredTabs from './TabPanel'

const Ranking = async () => {
  const userInfos = await prisma.user.findMany()

  return (
    <Grid container>
      <Grid
        item
        sm={3}
        position='fixed'
        width='30%'
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='flex-end'
        sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
      <Grid item sm={6} sx={{ ml: { sm: '25%', xs: '0%' } }}>
        <Container>
          <Typography
            align='center'
            variant='h1'
            color='hotpink'
            sx={{ typography: { sm: 'h1', xs: 'h4' }, mb: '20px' }}>
            Holder Ranking
          </Typography>
          <Box sx={{ width: '100%' }}>
            <CenteredTabs labels={['NFT', '$MAIDS']}>
              <NFTHolderTable userInfos={userInfos} />
              <MaidsHolderTable userInfos={userInfos} />
            </CenteredTabs>
          </Box>
        </Container>
      </Grid>
      <Grid
        item
        sm={3}
        position='fixed'
        width='30%'
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='flex-end'
        sx={{ ml: '75%', display: { xs: 'none', sm: 'flex' } }}>
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
  )
}

export default Ranking

export const metadata: Metadata = {
  title: 'Ranking',
}
