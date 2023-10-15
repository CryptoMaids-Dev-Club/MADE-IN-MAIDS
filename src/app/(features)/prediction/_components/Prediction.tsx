import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import PredictionList from './PredictionList'
import RewardRanking from './RewardRanking'

const Prediction = () => (
  <Container>
    <Typography variant='h1' align='center' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
      CryptoMaids Prediction
    </Typography>
    <PredictionList />
    <RewardRanking />
  </Container>
)

export default Prediction
