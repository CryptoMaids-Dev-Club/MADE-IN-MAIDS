import { Footer } from '@/app/_components/Footer'
import ItemDetail from './ItemDetail'
import type { NFTMetadata } from '../types'
import { getItems } from '@/app/market/api/getItems'
import { getMarketItems } from '@/app/market/api/getMarketItems'

const AssetDetail = async ({ params }: { params: { id: string } }) => {
  const items = await getItems()
  const marketItems = await getMarketItems(items)
  const marketItem = marketItems[Number(params.id)]

  return (
    <>
      <ItemDetail marketItem={marketItem} />
      <Footer />
    </>
  )
}

export default AssetDetail

const getMetadata = async (id: string) => {
  const metadataId = [5, 1, 3, 6]
  // ToDO: Modify Original Metadata URL
  const res = await fetch(
    `https://cryptomaids-art.s3.ap-northeast-1.amazonaws.com/market/metadata/${metadataId[Number(id)]}.json`
  )
  const data = (await res.json()) as NFTMetadata

  return data
}

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const meta = await getMetadata(params.id)

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
