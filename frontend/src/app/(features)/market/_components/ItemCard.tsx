import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type ItemCardProps = {
  item: MarketItemInfo
}

const ItemCard = ({ item }: ItemCardProps) => (
  <Card className='w-80 md:w-96'>
    <Link href={`/market/${item.id}`}>
      <div className='relative overflow-hidden bg-cover bg-no-repeat'>
        <div className='transition duration-300 hover:scale-110'>
          <Image src={item.image} width='390' height='350' alt='item' style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </Link>
    <div className='h-20 w-full bg-gray-800'>
      <Typography variant='h5' className='mx-2 truncate text-white'>
        {item.name}
      </Typography>
      <Typography variant='h6' className='mx-2 text-white'>
        {Math.ceil(Number(item.price))} $MAIDS
      </Typography>
    </div>
  </Card>
)

export default ItemCard
