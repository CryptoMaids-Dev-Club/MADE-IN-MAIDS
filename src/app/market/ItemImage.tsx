'use client'

import { Box, CardMedia, useMediaQuery } from '@mui/material'
import { useImageOrientation } from '@/hooks/useImageOrientation'
import { MarketItemInfo } from './types'

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
        <CardMedia sx={ImageStyle} component='img' height='350' image={item.image} />
      </Box>
    )

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Box overflow='hidden'>
      {orientation?.toString() === 'landscape' ? (
        <CardMedia
          sx={ImageStyle}
          component='img'
          width={matches ? 390 : window.innerWidth - 100}
          height='auto'
          image={item.image}
        />
      ) : (
        <CardMedia sx={ImageStyle} component='img' height='350' width='auto' image={item.image} />
      )}
    </Box>
  )
}

export default ItemImage
