import dynamic from 'next/dynamic'
import { getAsset } from '@/server/asset/query'
import { getMaidProfile } from '@/server/maidsProfile/query'
import { getNftOwner } from '@/server/nftOwner/query'

type NFTProfileProps = {
  id: number
}

const MaidsProfile = dynamic(() => import('./MaidsProfile'), { ssr: false })

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  const maidProfile = await getMaidProfile(id)
  const owner = await getNftOwner(id)
  const asset = await getAsset(id)

  return <MaidsProfile profile={{ ...maidProfile, id }} asset={asset} owner={owner} />
}

export default MaidsProfileWrapper
