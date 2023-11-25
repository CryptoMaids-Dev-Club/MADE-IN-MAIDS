import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import ItemImage from './ItemImage'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type ItemCardProps = {
  item: MarketItemInfo
}

const ItemCard = ({ item }: ItemCardProps) => (
  <Card className='w-[350px] h-[450px]'>
    <Link href={`/market/${item.id}`}>
      <div className='relative overflow-hidden bg-cover bg-no-repeat'>
        <div className='transition duration-300 hover:scale-110'>
          <ItemImage item={item} />
        </div>
      </div>
    </Link>
    <Typography variant='h5'>{item.name}</Typography>
    <Typography variant='h6'>{Math.ceil(Number(item.price))} $MAIDS</Typography>
  </Card>
)

export default ItemCard
