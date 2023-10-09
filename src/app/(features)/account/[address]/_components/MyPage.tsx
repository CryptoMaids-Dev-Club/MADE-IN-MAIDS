import { Suspense } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'
import MaidsList from './MaidsList'
import Profile from './Profile'
import ProfileSkelton from './ProfileSkelton'

type MyPageProps = {
  address: string
}

const MyPage = ({ address }: MyPageProps) => (
  <Container>
    <Suspense fallback={<ProfileSkelton />}>
      <Profile address={address} />
    </Suspense>
    <Typography variant='h1'>Your Maids</Typography>
    <Box sx={{ border: '3px dashed hotpink', borderRadius: '20px', padding: '10px' }}>
      <MaidsList targetAddress={address} />
    </Box>
    <br />
  </Container>
)

export default MyPage

export const metadata: Metadata = {
  title: 'MyPage',
}
