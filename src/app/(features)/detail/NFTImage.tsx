import Image from 'next/image'
import getAsset from '@/app/api/asset/[id]/getAsset'

type NFTImageProps = {
  id: number
}

export const NFTImage = async ({ id }: NFTImageProps) => {
  const asset = await getAsset({ id })

  return (
    <Image
      src={asset.external_url}
      alt='maids'
      width={500}
      height={800}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  )
}

export default NFTImage
