import { getMarketItems } from '@/server/market/query'
import ItemCard from './ItemCard'

const ItemList = async () => {
  const marketItems = await getMarketItems()

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {marketItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemList
