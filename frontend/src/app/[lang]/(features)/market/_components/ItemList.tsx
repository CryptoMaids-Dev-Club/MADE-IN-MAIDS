import { unstable_noStore as noStore } from 'next/cache'
import { getMarketItems } from '@/app/[lang]/(features)/market/_api/query'
import ItemCard from './ItemCard'

const ItemList = async ({ lang }: { lang: string }) => {
  noStore()
  const marketItems = await getMarketItems()

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {marketItems.map((item) => (
        <ItemCard lang={lang} key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemList
