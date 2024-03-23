import HowToEntry from '@/app/[lang]/(features)/lottery/_components/HowToEntry'
import HowToGetMedal from '@/app/[lang]/(features)/lottery/_components/HowToGetMedal'
import HowToGetTicket from '@/app/[lang]/(features)/lottery/_components/HowToGetTicket'
import LotteryInformation from '@/app/[lang]/(features)/lottery/_components/LotteryInformation'
import UserInfo from '@/app/[lang]/(features)/lottery/_components/UserInfo'
import BackToTop from '@/app/[lang]/_components/Elements/BackToTop/BackToTop'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Typography } from '@/components/ui/typography'
import type { LotteryInfo } from '@/app/[lang]/(features)/lottery/_type'

const Lottery = () => {
  const mockLotteryInfo = [
    {
      lotteryId: 1,
      startTime: '2021-08-01T00:00:00Z',
      endTime: '2021-08-01T00:00:00Z',
      prizes: [
        {
          prizeType: 0,
          contractAddress: '0x',
          tokenId: 0,
          amount: 100,
          claimed: false,
        },
      ],
    },
    {
      lotteryId: 1,
      startTime: '2021-08-01T00:00:00Z',
      endTime: '2021-08-01T00:00:00Z',
      prizes: [
        {
          prizeType: 0,
          contractAddress: '0x',
          tokenId: 0,
          amount: 100,
          claimed: false,
        },
      ],
    },
    {
      lotteryId: 1,
      startTime: '2021-08-01T00:00:00Z',
      endTime: '2021-08-01T00:00:00Z',
      prizes: [
        {
          prizeType: 0,
          contractAddress: '0x',
          tokenId: 0,
          amount: 100,
          claimed: false,
        },
      ],
    },
  ] as LotteryInfo[]

  return (
    <div className='container mx-auto h-dvh min-h-full max-w-7xl pb-12'>
      <Typography variant='h1' className='my-2 text-center text-pink-500'>
        CryptoMaids Lottery
      </Typography>

      <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-8'>
        <LotteryInformation lotteryInfo={mockLotteryInfo[0]} />
        <Divider className='my-2' />
        <UserInfo />
        <Button className='w-full bg-yellow-300 text-2xl'>Entry</Button>
      </div>

      <Typography variant='h2' className='my-8 text-center text-pink-500'>
        参加方法
      </Typography>
      <HowToEntry />

      <Typography variant='h2' className='mt-8 text-center text-pink-500'>
        メダルNFTをゲットするには?
      </Typography>
      <Typography variant='lead' className='text-center'>
        メダルNFTはコミュニティイベントに積極的に参加するとゲットできます!
      </Typography>
      <HowToGetMedal />

      <Typography variant='h2' className='mt-8 text-center text-pink-500'>
        チケットNFTをゲットするには?
      </Typography>
      <Typography variant='lead' className='text-center'>
        チケットNFTはCryptoMaids NFTを保有しているともらえる$MAIDSで購入できます!
      </Typography>
      <HowToGetTicket />

      <BackToTop />
    </div>
  )
}

export default Lottery
