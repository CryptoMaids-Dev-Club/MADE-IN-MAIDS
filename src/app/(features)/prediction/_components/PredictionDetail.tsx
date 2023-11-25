import { Suspense } from 'react'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import PredictionResult from '@/app/(features)/prediction/_components/PredictionResult'
import PredictionUserInfo from '@/app/(features)/prediction/_components/PredictionUserInfo'
import getPrediction from '@/app/api/prediction/[id]/getPrediction'
import type { PredictionText } from '@/app/api/prediction/prediction'

const PredictionForm = dynamic(() => import('./PredictionForm'), { ssr: false })

type PredictionDetailProps = {
  id: number
}

const PredictionDetail = async ({ id }: PredictionDetailProps) => {
  const predictionInfo = await getPrediction({ id })
  const response = await fetch(predictionInfo.predictionURI)
  const predictionText = (await response.json()) as PredictionText

  const jstTime = new Date(predictionInfo.endTime * 1000).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  })
  const utcTime = new Date(predictionInfo.endTime * 1000).toLocaleString('en-US')

  return (
    <Container maxWidth='sm'>
      <Stack spacing={2} divider={<Divider />}>
        <Typography variant='h2' align='center'>
          {predictionText.title}
        </Typography>

        <Typography variant='h4' align='center' color='hotpink'>
          {predictionText.description}
        </Typography>

        <div>
          <Typography variant='h4' sx={{ mt: '10px' }}>
            Detail
          </Typography>
          <Typography variant='body1'>
            End Date: {jstTime} (JST) / {utcTime} (UTC)
          </Typography>
          <Typography variant='body1'>Rate: x{(100 + predictionInfo.rate) / 100}</Typography>
        </div>

        <div>
          <Typography variant='h4'>Choices</Typography>
          <PredictionForm predictionInfo={predictionInfo} predictionText={predictionText} />
        </div>

        <div>
          <Typography variant='h4'>Your Prediction</Typography>
          <Suspense fallback={<Typography variant='body1'>Loading...</Typography>}>
            <PredictionUserInfo id={id} choices={predictionText.choices} />
          </Suspense>
        </div>

        <div>
          <Typography variant='h4'>Result</Typography>
          <Suspense fallback={<Typography variant='body1'>Loading...</Typography>}>
            <PredictionResult predictionInfo={predictionInfo} predictionText={predictionText} />
          </Suspense>
        </div>
      </Stack>
    </Container>
  )
}

export default PredictionDetail
