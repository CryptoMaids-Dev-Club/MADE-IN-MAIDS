import MaidsProfile from '@/app/[lang]/(features)/detail/_components/MaidsProfile'
import { getAsset } from '@/server/asset/query'
import { getMaidProfile } from '@/server/maidsProfile/query'
import { getNftOwner } from '@/server/nftOwner/query'

type NFTProfileProps = {
  id: number
}

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  const [maidProfile, owner, asset] = await Promise.all([getMaidProfile(id), getNftOwner(id), getAsset(id)])

  return <MaidsProfile profile={{ ...maidProfile }} asset={asset} owner={owner} />
}

export default MaidsProfileWrapper
