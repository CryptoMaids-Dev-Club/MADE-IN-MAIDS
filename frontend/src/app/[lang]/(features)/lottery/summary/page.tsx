import LotteryList from '@/app/[lang]/(features)/lottery/_components/LotteryList'
import { Typography } from '@/components/ui/typography'

const SummaryPage = () => {
  return (
    <div className='container mx-auto h-dvh min-h-full max-w-7xl pb-12'>
      <Typography variant='h1' className='my-2 text-center text-pink-500'>
        過去の抽選結果
      </Typography>
      <LotteryList />
    </div>
  )
}

export default SummaryPage
