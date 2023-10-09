import { Suspense } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import getAllPredictions from '@/app/api/prediction/getAllPredictions'
import PredictionInfoCard from './PredictionInfoCard'
import type { Prediction } from '@/app/api/prediction/prediction'

const PredictionList = async () => {
  const predictionInfos = (await getAllPredictions()) as Prediction[]

  return (
    <Container>
      <Typography variant='h1' align='center' color='hotpink' sx={{ typography: { sm: 'h1', xs: 'h4' } }}>
        CryptoMaids Prediction
      </Typography>
      <Box sx={{ border: '3px dashed hotpink', borderRadius: '20px', padding: '10px' }}>
        <Grid container spacing={2}>
          {predictionInfos.reverse().map((predictionInfo) => (
            <Grid item key={predictionInfo.id}>
              <Suspense fallback={<Skeleton />}>
                <PredictionInfoCard predictionInfo={predictionInfo} />
              </Suspense>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default PredictionList
