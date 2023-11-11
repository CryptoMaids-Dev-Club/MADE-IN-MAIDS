import { Suspense } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import PredictionList from './PredictionList'
import PredictionListSkelton from './PredictionListSkeleton'
import RewardRanking from './RewardRanking'

const Prediction = () => (
  <Container>
    <Typography variant='h1' align='center' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
      CryptoMaids Prediction
    </Typography>
    <Suspense fallback={<PredictionListSkelton />}>
      <PredictionList />
    </Suspense>
    <Typography variant='h1' align='center' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
      Reward Ranking
    </Typography>
    <Suspense fallback={<CenteringCircularProgress />}>
      <RewardRanking />
    </Suspense>
  </Container>
)

export default Prediction
