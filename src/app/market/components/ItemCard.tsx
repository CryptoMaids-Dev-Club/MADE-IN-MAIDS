'use client'

import { Grid, Typography, Card, CardContent, CardActions, useMediaQuery } from '@mui/material'
import type { MarketItemInfo } from '@/app/market/types'
import DetailModal from './DetailModal'
import ItemImage from './ItemImage'

type ItemCardProps = {
  item: MarketItemInfo
}

const ItemCard = ({ item }: ItemCardProps) => {
  const matches = useMediaQuery('(min-width: 560px)')

  return (
    <Card sx={{ width: matches ? 370 : window.innerWidth * 0.8, height: 490 }}>
      <ItemImage item={item} />
      <CardContent>
        <Grid>
          <Typography variant='h5' noWrap sx={{ color: 'black' }}>
            {item.name}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant='h6' sx={{ color: 'black' }}>
            {Math.ceil(Number(item.price))} $MAIDS
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid>
          <DetailModal item={item} />
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ItemCard
