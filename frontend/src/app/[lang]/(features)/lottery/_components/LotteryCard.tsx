import Link from 'next/link'
import type { LotteryInfo } from '@/app/[lang]/(features)/lottery/_type'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { unixToDate } from '@/utils/date'

type LotteryProps = {
  lotteryId: number
  lotteryInfo: LotteryInfo
}

const LotteryInfoCard = async ({ lotteryId, lotteryInfo }: LotteryProps) => {
  const { jstTime } = unixToDate(lotteryInfo.endTime)

  const message = () => {
    if (lotteryInfo.ended) {
      return 'Ended'
    }
    if (lotteryInfo.endTime < Date.now() / 1000) {
      return 'Waiting for result'
    }
    return 'Ongoing'
  }

  return (
    <Link href={`/lottery/${lotteryId}`}>
      <Card className='w-full border-2 border-gray-500 bg-gray-900'>
        <CardContent>
          <Badge variant={lotteryInfo.ended ? 'destructive' : 'success'}>{message()}</Badge>
          <Typography variant='h3'>終了日時: {jstTime}</Typography>
          <Typography variant='h5' className='text-pink-500'>
            {lotteryInfo.totalShares} Entries
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default LotteryInfoCard
