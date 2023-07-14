import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { MarketItemInfo } from '@/app/market/types'
import Link from 'next/link'
import ItemImage from './ItemImage'

type ItemCardProps = {
  item: MarketItemInfo
}

const ItemCard = ({ item }: ItemCardProps) => {
  const matches = useMediaQuery('(min-width: 560px)')

  return (
    <Link href={`/market/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card sx={{ width: matches ? 370 : window.innerWidth * 0.8, height: 480 }}>
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
      </Card>
    </Link>
  )
}

export default ItemCard
