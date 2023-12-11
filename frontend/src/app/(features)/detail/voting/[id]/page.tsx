import getAsset from '@/app/api/asset/[id]/getAsset'
import Voting from '../_components/Voting'

const VotingPage = ({ params }: { params: { id: number } }) => <Voting id={Number(params.id)} />

export default VotingPage

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
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
