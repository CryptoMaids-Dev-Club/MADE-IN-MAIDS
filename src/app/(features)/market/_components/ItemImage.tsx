'use client'

import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Image from 'next/image'
import { useImageOrientation } from '@/hooks/useImageOrientation'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type ItemImageProps = {
  item: MarketItemInfo
}

const ImageStyle = {
  '&:hover': {
    transform: 'scale(1.1,1.1)',
    transition: '0.5s all',
  },
  '&:focus': {
    transform: 'scale(1.1,1.1)',
    margin: 'auto 0',
    transition: '0.5s all',
  },
}

const ItemImage = ({ item }: ItemImageProps) => {
  const orientation = useImageOrientation(item.image)

  if (item.nsfw)
    return (
      <Box overflow='hidden'>
        <CardMedia sx={{ ...ImageStyle, position: 'relative' }}>
          <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
        </CardMedia>
      </Box>
    )

  return (
    <Box overflow='hidden'>
      {orientation?.toString() === 'landscape' ? (
        <CardMedia sx={{ ...ImageStyle, position: 'relative' }}>
          <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
        </CardMedia>
      ) : (
        <CardMedia sx={{ ...ImageStyle, position: 'relative' }}>
          <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
        </CardMedia>
      )}
    </Box>
  )
}

export default ItemImage
