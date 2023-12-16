import Image from 'next/image'
import getAsset from '@/app/api/asset/[id]/getAsset'
import { Typography } from '@/components/ui/typography'

type NFTInfoProps = {
  id: number
}

export const NFTInfo = async ({ id }: NFTInfoProps) => {
  const asset = await getAsset({ id })

  return (
    <div className='flex flex-row'>
      <Typography variant='h2'>{asset.name}</Typography>
      <a className='mx-2' href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${id}`}>
        <Image src='/images/Logomark-Blue.png' alt='logo' height='35' width='35' />
      </a>
    </div>
  )
}

export default NFTInfo
