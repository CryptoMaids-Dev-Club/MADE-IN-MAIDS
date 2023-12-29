import { getMarketItems } from '@/app/(features)/market/_api/query'
import ItemDetail from '../_components/ItemDetail'
import type { MarketItemInfo } from '@/app/(features)/market/_types'

const AssetDetail = async ({ params }: { params: { id: string } }) => {
  const marketItems = await getMarketItems()
  const marketItem = marketItems[Number(params.id)] as MarketItemInfo

  return <ItemDetail marketItem={marketItem} />
}

export default AssetDetail

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
  const marketItems = await getMarketItems()
  const meta = marketItems[params.id] as MarketItemInfo

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
