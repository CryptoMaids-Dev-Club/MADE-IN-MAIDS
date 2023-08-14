import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Profile from './Profile'
import MaidsList from './MaidsList'

const MyPage = ({ params }: { params: { address: string } }) => (
  <Container>
    <Profile address={params.address} />
    <Typography variant='h1' sx={{ color: 'white' }}>
      Your Maids
    </Typography>
    <Box sx={{ border: '3px dashed hotpink', borderRadius: '20px', padding: '10px' }}>
      <MaidsList targetAddress={params.address} />
    </Box>
  </Container>
)

export default MyPage
