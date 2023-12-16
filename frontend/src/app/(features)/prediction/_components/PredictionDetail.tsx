import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import PredictionResult from '@/app/(features)/prediction/_components/PredictionResult'
import PredictionUserInfo from '@/app/(features)/prediction/_components/PredictionUserInfo'
import getPrediction from '@/app/api/prediction/[id]/getPrediction'
import { Divider } from '@/components/ui/divider'
import { Typography } from '@/components/ui/typography'
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
    <div className='container mx-auto max-w-xl pb-12'>
      <Typography variant='h2' className='text-center'>
        {predictionText.title}
      </Typography>
      <Divider />
      <Typography variant='h3' className='text-center text-pink-500'>
        {predictionText.description}
      </Typography>

      <Typography variant='h3'>Detail</Typography>
      <Typography variant='h4'>
        End Date: {jstTime} (JST) / {utcTime} (UTC)
      </Typography>
      <Typography variant='h4'>Rate: x{(100 + predictionInfo.rate) / 100}</Typography>
      <br />

      <Typography variant='h4'>Choices</Typography>
      <PredictionForm predictionInfo={predictionInfo} predictionText={predictionText} />

      <Divider className='my-2' />
      <Typography variant='h3'>Your Prediction</Typography>
      <Suspense fallback={<Typography variant='h4'>Loading...</Typography>}>
        <PredictionUserInfo id={id} choices={predictionText.choices} />
        <Divider className='my-2' />
      </Suspense>

      <Typography variant='h3'>Result</Typography>
      <Suspense fallback={<Typography variant='h4'>Loading...</Typography>}>
        <PredictionResult predictionInfo={predictionInfo} predictionText={predictionText} />
      </Suspense>
    </div>
  )
}

export default PredictionDetail
