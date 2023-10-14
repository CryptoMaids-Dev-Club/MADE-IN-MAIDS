import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import ClaimButton from '@/app/(features)/prediction/_components/ClaimButton'
import PredictionUserInfo from '@/app/(features)/prediction/_components/PredictionUserInfo'
import Result from '@/app/(features)/prediction/_components/Result'
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
      <Typography variant='h2' align='center'>
        {predictionText.title}
      </Typography>
      <Divider sx={{ mt: '5px' }} />
      <Typography variant='h4' align='center' color='hotpink'>
        {predictionText.description}
      </Typography>

      <Typography variant='h4' sx={{ mt: '10px' }}>
        Detail
      </Typography>
      <Typography variant='body1'>
        End Date: {jstTime} (JST) / {utcTime} (UTC)
      </Typography>
      <Typography variant='body1'>Rate: x{(100 + predictionInfo.rate) / 100}</Typography>
      <br />
      <PredictionForm predictionInfo={predictionInfo} predictionText={predictionText} />

      <Divider sx={{ mt: '20px' }} />
      <PredictionUserInfo id={id} choices={predictionText.choices} />
      <Divider sx={{ mt: '5px' }} />

      <Result predictionInfo={predictionInfo} predictionText={predictionText} />

      <ClaimButton predictionInfo={predictionInfo} />
    </Container>
  )
}

export default PredictionDetail
