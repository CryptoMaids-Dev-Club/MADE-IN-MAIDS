'use client'

import Image from 'next/image'
import { useImageOrientation } from '@/hooks/useImageOrientation'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type ItemImageProps = {
  item: MarketItemInfo
}

const ItemImage = ({ item }: ItemImageProps) => {
  const orientation = useImageOrientation(item.image)

  if (item.nsfw) return <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />

  return (
    <>
      {orientation?.toString() === 'landscape' ? (
        <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
      ) : (
        <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
      )}
    </>
  )
}

export default ItemImage
