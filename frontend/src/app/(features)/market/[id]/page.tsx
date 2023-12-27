import { getMarketItems } from '@/server/market/query'
import ItemDetail from '../_components/ItemDetail'
import type { MarketItemInfo } from '@/server/market/marketItem'

const AssetDetail = async ({ params }: { params: { id: string } }) => {
  const marketItems = await getMarketItems()
  const marketItem = marketItems[Number(params.id)] as MarketItemInfo

  return <ItemDetail marketItem={marketItem} />
}

export default AssetDetail

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const marketItems = await getMarketItems()
  const meta = marketItems[Number(params.id)] as MarketItemInfo

  return {
    title: 'Item',
    openGraph: {
      title: meta.name,
      description: meta.description,
      siteName: 'CryptoMaids Market',
      images: [
        {
          url: meta.image,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.name,
      description: meta.description,
      creator: '@CryptoMaids',
      images: [meta.image],
    },
  }
}
