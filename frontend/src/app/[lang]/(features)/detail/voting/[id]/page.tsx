import { getAsset } from '@/server/asset/query'
import Voting from '../_components/Voting'

const VotingPage = async (params: { params: Promise<{ id: string }> }) => {
  const { id } = await (await params).params
  return <Voting id={Number(id)} />
}

export default VotingPage

export const generateMetadata = async (params: { params: Promise<{ id: number }> }) => {
  const { id } = await (await params).params
  const meta = await getAsset(id)

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
