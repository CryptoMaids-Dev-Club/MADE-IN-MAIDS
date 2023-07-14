import { Header } from '@/app/_components/Header'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import { getItems } from '@/app/market/api/getItems'
import { getMarketItems } from '@/app/market/api/getMarketItems'
import ItemList from './ItemList'

const Market = async () => {
  // const items = useItems()
  const items = await getItems()
  // const marketItems = useMetadata(items as ItemInfo[])
  const marketItems = await getMarketItems(items)

  return (
    <>
      <Header />
      <ItemList marketItems={marketItems} />
      <Footer />
    </>
  )
}

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
