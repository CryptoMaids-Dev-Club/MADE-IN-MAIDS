import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import ItemImage from './ItemImage'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type ItemCardProps = {
  item: MarketItemInfo
}

const ItemCard = ({ item }: ItemCardProps) => (
  <Link href={`/market/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Card sx={{ width: 370, height: 480 }}>
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

export default ItemCard
