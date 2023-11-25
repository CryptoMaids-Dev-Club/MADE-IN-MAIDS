import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import ItemImage from './ItemImage'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type ItemCardProps = {
  item: MarketItemInfo
}

const ItemCard = ({ item }: ItemCardProps) => (
  <Link href={`/market/${item.id}`} style={{ textDecoration: 'none' }}>
    <Card sx={{ width: 370, height: 480, boxShadow: 12 }}>
      <ItemImage item={item} />
      <CardContent>
        <div>
          <Typography variant='h5' noWrap>
            {item.name}
          </Typography>
        </div>
        <div>
          <Typography variant='h6'>{Math.ceil(Number(item.price))} $MAIDS</Typography>
        </div>
      </CardContent>
    </Card>
  </Link>
)

export default ItemCard
