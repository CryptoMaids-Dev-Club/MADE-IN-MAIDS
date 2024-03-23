import Image from 'next/image'
import { FadeInBottom } from '@/app/[lang]/_components/Elements/FadeInButton'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const HowToEntry = () => {
  return (
    <FadeInBottom>
      <div className='grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='h-80 w-full border-2 border-gray-500 bg-gray-900'>
          <CardContent>
            <Typography variant='h3' className='text-yellow-300'>
              1.Get Medal NFT and Ticket NFT
            </Typography>
            <Typography variant='largeText'>
              イベントへの参加でメダルNFT、$MAIDSを使ってチケットNFTをゲットしよう!{<br />}
              詳細はページ下部の情報をチェック!
            </Typography>
            <div className='mt-4 grid grid-cols-2'>
              <Image src='/images/medal.png' alt='medal' width={200} height={200} />
              <Image src='/images/ticket.png' alt='ticket' width={200} height={200} />
            </div>
          </CardContent>
        </Card>

        <Card className='h-80 w-full border-2 border-gray-500 bg-gray-900'>
          <CardContent>
            <Typography variant='h3' className='text-yellow-300'>
              2.Entry the Lottery
            </Typography>
            <Typography variant='largeText'>
              メダルNFT1つとチケットNFT1つを使って{<br />}抽選に参加しよう!{<br />}参加口数が多いほど当選率UP
            </Typography>
            <div className='flex justify-center'>
              <Image src='/images/lotteryBox.png' alt='medal' width={250} height={250} />
            </div>
          </CardContent>
        </Card>

        <Card className='h-80 border-2 border-gray-500 bg-gray-900'>
          <CardContent>
            <Typography variant='h3' className='text-yellow-300'>
              3.Wait until Lottery Day
            </Typography>
            <Typography variant='largeText'>当選したらDiscordでチケットを開こう!</Typography>
            <div className='mt-8 grid grid-cols-5'>
              <div className='col-span-3'>
                <Image src='/images/yuki.png' alt='medal' width={600} height={600} />
              </div>
              <div className='col-span-2 mt-10'>
                <Image src='/images/popper.png' alt='medal' width={200} height={200} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FadeInBottom>
  )
}

export default HowToEntry
