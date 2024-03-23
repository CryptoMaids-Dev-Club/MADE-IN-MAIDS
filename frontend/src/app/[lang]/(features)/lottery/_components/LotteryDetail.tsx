import PrizeCard from '@/app/[lang]/(features)/lottery/_components/PrizeCard'
import { Typography } from '@/components/ui/typography'

type LotteryProps = {
  id: number
}

const Lottery = ({ id }: LotteryProps) => {
  console.log(id)

  return (
    <div className='container mx-auto mt-4 max-w-[1200px] pb-12'>
      <div className='grid gap-4'>
        <Typography variant='h1' className='my-2 text-center text-pink-500'>
          CryptoMaids Lottery
        </Typography>
        <Typography variant='h2' className='my-2 text-center text-pink-500'>
          Prizes
        </Typography>

        <div className='mx-10 grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-5'>
          <PrizeCard image='/images/mogm.png' description={'top:market'} link='/market' />
          <PrizeCard
            image='/images/staking.png'
            description='Hold CryptoMaids earn $MAIDS'
            link='https://made-in-maids.cryptomaids.tokyo/'
          />
          <PrizeCard image='/images/voting.png' description='Let’s make your maid NO.1' link='/voting' />
          <PrizeCard
            image='/images/ranking.png'
            description='CryptoMaids NFT & $MAIDS holder ranking'
            link='/ranking'
          />
          <PrizeCard
            image='/images/prediction.png'
            description='Predict the CryptoMaids event results'
            link='/prediction'
          />
        </div>

        <Typography variant='h2' className='my-2 text-center text-pink-500'>
          Entry
        </Typography>

        <Typography variant='h2' className='my-2 text-center text-pink-500'>
          Lottery Info
        </Typography>

        <Typography variant='h2' className='my-2 text-center text-pink-500'>
          Result
        </Typography>
      </div>
    </div>
  )
}

export default Lottery
