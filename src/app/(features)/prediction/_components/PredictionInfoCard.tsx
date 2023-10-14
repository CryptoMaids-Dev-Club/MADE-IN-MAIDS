import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import type { Prediction, PredictionText } from '@/app/api/prediction/prediction'

type PredictionProps = {
  predictionInfo: Prediction
}

const PredictionInfoCard = async ({ predictionInfo }: PredictionProps) => {
  const response = await fetch(predictionInfo.predictionURI)
  const predictionText = (await response.json()) as PredictionText

  const labelMessage = () => {
    if (predictionInfo.isSettled) {
      return 'Finished'
    } else if (predictionInfo.endTime < Date.now() / 1000) {
      return 'Waiting for result'
    } else {
      return 'Ongoing'
    }
  }

  return (
    <Link href={`/prediction/${predictionInfo.id}`}>
      <Card sx={{ border: '1px solid gray', width: 350 }}>
        <CardContent>
          <Chip
            label={labelMessage()}
            color={predictionInfo.isSettled ? 'error' : 'success'}
            variant='outlined'
            size='small'
          />
          <Typography variant='h5' component='div'>
            {predictionText.title}
          </Typography>
          <Typography variant='body1' color='hotpink'>
            {predictionText.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default PredictionInfoCard
