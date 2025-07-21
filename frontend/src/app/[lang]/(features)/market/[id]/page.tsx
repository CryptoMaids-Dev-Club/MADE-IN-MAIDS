import { getMarketItems } from '@/app/[lang]/(features)/market/_api/query'
import type { MarketItemInfo } from '@/app/[lang]/(features)/market/_types'
import ItemDetail from '../_components/ItemDetail'

const AssetDetail = async (params: { params: Promise<{ id: string }> }) => {
  const { id } = await params.params
  return <ItemDetail id={Number(id)} />
}

export default AssetDetail

export const generateMetadata = async (params: { params: Promise<{ id: string }> }) => {
  const { id } = await params.params
  const marketItems = await getMarketItems()
  const meta = marketItems[Number(id)] as MarketItemInfo

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
