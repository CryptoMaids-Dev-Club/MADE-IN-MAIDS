import { CardMedia, useMediaQuery } from '@mui/material'
import { useImageOrientation } from '@/hooks/useImageOrientation'
import { MarketItemInfo } from '../types'

type ItemImageProps = {
  item: MarketItemInfo
}

const ItemImage = ({ item }: ItemImageProps) => {
  const orientation = useImageOrientation(item.image)
  const matches = useMediaQuery('(min-width: 560px)')

  if (item.nsfw) return <CardMedia component='img' height='350' image={item.image} />

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {orientation?.toString() === 'landscape' ? (
        <CardMedia component='img' width={matches ? 390 : window.innerWidth - 100} height='auto' image={item.image} />
      ) : (
        <CardMedia component='img' height='350' width='auto' image={item.image} />
      )}
    </>
  )
}

export default ItemImage
