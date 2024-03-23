import PrizeCard from '@/app/[lang]/(features)/lottery/_components/PrizeCard'
import { LotteryInfo } from '@/app/[lang]/(features)/lottery/_type'
import { Typography } from '@/components/ui/typography'

type LotteryInformationProps = {
  lotteryInfo: LotteryInfo
}

const LotteryInformation = ({ lotteryInfo }: LotteryInformationProps) => {
  console.log(lotteryInfo)
  return (
    <>
      <Typography variant='h2' className='my-2  text-pink-500'>
        Lottery Info
      </Typography>
      <Typography variant='largeText'>終了時刻: 2024/3/31</Typography>
      <Typography variant='largeText'>現在の参加人数: 10人</Typography>

      <Typography variant='h2' className='my-2 text-yellow-400'>
        Prizes
      </Typography>
      <div className='grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-5'>
        <PrizeCard image='/images/mogm.png' description={'top:market'} link='/market' />
        <PrizeCard
          image='/images/staking.png'
          description='Hold CryptoMaids earn $MAIDS'
          link='https://made-in-maids.cryptomaids.tokyo/'
        />
        <PrizeCard image='/images/voting.png' description='Let’s make your maid NO.1' link='/voting' />
        <PrizeCard image='/images/ranking.png' description='CryptoMaids NFT & $MAIDS holder ranking' link='/ranking' />
        <PrizeCard
          image='/images/prediction.png'
          description='Predict the CryptoMaids event results'
          link='/prediction'
        />
      </div>
      <Typography variant='h2' className=' text-yellow-400'>
        Winners
      </Typography>
      <Typography variant='largeText'>0x1234567890abcdef</Typography>
      <Typography variant='largeText'>0x1234567890abcdef</Typography>
      <Typography variant='largeText'>0x1234567890abcdef</Typography>
      <Typography variant='largeText'>0x1234567890abcdef</Typography>
    </>
  )
}

export default LotteryInformation
