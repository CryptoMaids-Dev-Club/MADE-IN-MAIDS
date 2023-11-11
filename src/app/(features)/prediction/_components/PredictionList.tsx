import { Suspense } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import getAllPredictions from '@/app/api/prediction/getAllPredictions'
import PredictionInfoCard from './PredictionInfoCard'
import type { Prediction } from '@/app/api/prediction/prediction'

const PredictionList = async () => {
  const predictionInfos = (await getAllPredictions()) as Prediction[]

  return (
    <Box sx={{ border: '3px dashed hotpink', borderRadius: '20px', padding: '10px' }}>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        {predictionInfos.reverse().map((predictionInfo) => (
          <Grid item key={predictionInfo.id}>
            <Suspense fallback={<Skeleton width={350} height={150} />}>
              <PredictionInfoCard predictionInfo={predictionInfo} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PredictionList
