import { Header } from '@/app/_components/Header'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import getMarketItems from '@/app/api/marketItems/getMarketItems'
import ItemList from './ItemList'

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, react/function-component-definition
export default async function Market() {
  const marketItems = await getMarketItems()

  return (
    <>
      <Header />
      <ItemList marketItems={marketItems} />
      <Footer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Market',
}
