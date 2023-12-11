import { notFound } from 'next/navigation'
import getAsset from '@/app/api/asset/[id]/getAsset'
import Detail from '../_components/Detail'

const DetailPage = ({ params }: { params: { id: number } }) => {
  if (params.id > 2022) {
    // CryptoMaids max token id is 2022
    return notFound()
  }

  return <Detail id={params.id} />
}

export default DetailPage

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
  if (params.id > 2022) {
    // CryptoMaids max token id is 2022
    return notFound()
  }
  const meta = await getAsset({ id: params.id })

  return {
    title: 'Detail',
    openGraph: {
      title: meta.name,
      siteName: 'CryptoMaids Made in Maids',
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
      creator: '@CryptoMaids',
      images: [meta.image],
    },
  }
}
