import Link from 'next/link'
import { LotteryInfo } from '@/app/[lang]/(features)/lottery/_type'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type LotteryProps = {
  lotteryInfo: LotteryInfo
}

const LotteryInfoCard = async ({ lotteryInfo }: LotteryProps) => {
  return (
    <Link href={`/lottery/${lotteryInfo.lotteryId}`}>
      <Card className='w-full border-2 border-gray-500 bg-gray-900'>
        <CardContent>
          {/* <Badge variant={lotteryInfo.isSettled ? 'destructive' : 'success'}>{labelMessage()}</Badge> */}
          <Typography variant='h3'>March Lottery</Typography>
          <Typography variant='h5' className='text-pink-500'>
            Test
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default LotteryInfoCard
