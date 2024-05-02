import LotteryInformation from '@/app/[lang]/(features)/lottery/_components/LotteryInformation'
import BackToTop from '@/app/[lang]/_components/Elements/BackToTop/BackToTop'
import { Typography } from '@/components/ui/typography'

type LotteryProps = {
  lang: string
  lotteryId: number
}

const Lottery = ({ lang, lotteryId }: LotteryProps) => {
  return (
    <div className='container mx-auto mb-12 h-dvh min-h-full max-w-7xl'>
      <Typography variant='h1' className='my-2 text-center text-pink-500'>
        CryptoMaids Lottery
      </Typography>

      <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-8'>
        <LotteryInformation lang={lang} lotteryId={lotteryId} />
      </div>
      <BackToTop />
    </div>
  )
}

export default Lottery
