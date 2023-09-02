import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'
import Profile from './Profile'
import MaidsList from './MaidsList'

type MyPageProps = {
  address: string
}

const MyPage = ({ address }: MyPageProps) => (
  <Container>
    <Profile address={address} />
    <Typography variant='h1' sx={{ color: 'white' }}>
      Your Maids
    </Typography>
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
