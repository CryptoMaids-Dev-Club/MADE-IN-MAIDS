import { notFound } from 'next/navigation'
import { getAsset } from '@/server/asset/query'
import Detail from '../_components/Detail'

const DetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params
  if (Number(id) > 2022) {
    // CryptoMaids max token id is 2022
    return notFound()
  }

  return <Detail id={Number(id)} />
}

export default DetailPage

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  if (Number(id) > 2022) {
    // CryptoMaids max token id is 2022
    return notFound()
  }
  const meta = await getAsset(Number(id))

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
