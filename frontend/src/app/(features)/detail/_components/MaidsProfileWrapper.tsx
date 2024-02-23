import dynamic from 'next/dynamic'
import { getAsset } from '@/server/asset/query'
import { getMaidProfile } from '@/server/maidsProfile/query'
import { getNftOwner } from '@/server/nftOwner/query'

type NFTProfileProps = {
  id: number
}

const MaidsProfile = dynamic(() => import('./MaidsProfile'), { ssr: false })

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  const [maidProfile, owner, asset] = await Promise.all([getMaidProfile(id), getNftOwner(id), getAsset(id)])

  return <MaidsProfile profile={{ ...maidProfile }} asset={asset} owner={owner} />
}

export default MaidsProfileWrapper
