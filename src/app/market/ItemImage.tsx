'use client'

import { Box, CardMedia, useMediaQuery } from '@mui/material'
import { useImageOrientation } from '@/hooks/useImageOrientation'
import { MarketItemInfo } from './types'
import Image from 'next/image'

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
  const matches = useMediaQuery('(min-width: 560px)')

  if (item.nsfw)
    return (
      <Box overflow='hidden'>
        <CardMedia sx={{ ...ImageStyle, position: 'relative' }}>
          <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
        </CardMedia>
      </Box>
    )

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
