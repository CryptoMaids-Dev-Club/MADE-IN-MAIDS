import Image from 'next/image'
import Link from 'next/link'
import { FadeInBottom } from '@/app/[lang]/_components/Elements/FadeInButton'
import { Typography } from '@/components/ui/typography'

const HowToGetTicket = () => {
  return (
    <div className='pb-12'>
      <FadeInBottom>
        <div className='my-4 grid grid-cols-1 items-center gap-2 md:grid-cols-5'>
          <div className='col-span-2 flex items-center justify-center'>
            <Image src='/images/staking.png' alt='medal' width={500} height={500} />
          </div>
          <div className='col-span-3 ml-8'>
            <Typography variant='h2'>1. $MAIDSをゲット</Typography>
            <Typography variant='lead'>
              <Link className='text-yellow-300 underline' href='https://made-in-maids.cryptomaids.tokyo/'>
                CryptoMaids Staking
              </Link>
              で$MAIDSをClaim
              <br />
              $MAIDSはCryptoMaids NFTを持っていると、自動で溜まっていきます
            </Typography>
          </div>
        </div>
      </FadeInBottom>

      <FadeInBottom>
        <div className='my-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-5'>
          <div className='col-span-2 flex items-center justify-center'>
            <Image src='/images/mogm.png' alt='mogm' width={500} height={500} />
          </div>
          <div className='col-span-3 ml-8'>
            <Typography variant='h2'>2. チケットNFTを購入</Typography>
            <Typography variant='lead'>
              Claimした$MAIDSを使って、
              <Link className='text-yellow-300 underline' href='/market'>
                CryptoMaids Market
              </Link>
              でチケットNFTを購入
            </Typography>
          </div>
        </div>
      </FadeInBottom>
    </div>
  )
}

export default HowToGetTicket
