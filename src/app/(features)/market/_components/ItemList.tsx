import getMarketItems from '@/app/api/marketItems/getMarketItems'
import ItemCard from './ItemCard'

const ItemList = async () => {
  const marketItems = await getMarketItems()

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center'>
      {marketItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemList
