import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Profile from './Profile'
import MaidsList from './MaidsList'

const MyPage = ({ params }: { params: { address: string } }) => (
  <Container>
    <Suspense
      fallback={
        <Grid container justifyContent='center' alignContent='center' mt='20px'>
          <CircularProgress />
        </Grid>
      }>
      <Profile address={params.address} />
    </Suspense>
    <Typography variant='h1' sx={{ color: 'white' }}>
      Your Maids
    </Typography>
    <Box sx={{ border: '3px dashed hotpink', borderRadius: '20px', padding: '10px' }}>
      <MaidsList targetAddress={params.address} />
    </Box>
  </Container>
)

export default MyPage
