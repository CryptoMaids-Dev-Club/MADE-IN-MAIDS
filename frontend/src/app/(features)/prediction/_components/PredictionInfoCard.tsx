import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import type { Prediction, PredictionText } from '@/app/(features)/prediction/_types'

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
      <Card className='w-full border-2 border-gray-500 bg-gray-900'>
        <CardContent>
          <Badge variant={predictionInfo.isSettled ? 'destructive' : 'success'}>{labelMessage()}</Badge>
          <Typography variant='h3'>{predictionText.title}</Typography>
          <Typography variant='h5' className='text-pink-500'>
            {predictionText.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default PredictionInfoCard
