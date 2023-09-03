import getMaidProfile from '@/app/api/maidsProfile/[id]/getMaidProfile'
import getNftOwner from '@/app/api/nftOwner/[id]/getNftOwner'
import getAsset from '@/app/api/asset/[id]/getAsset'
import MaidsProfile from './MaidsProfile'

type NFTProfileProps = {
  id: number
}

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  const maidProfile = await getMaidProfile({ id })
  const owner = await getNftOwner({ id })
  const asset = await getAsset({ id })

  return <MaidsProfile profile={{ ...maidProfile, id }} asset={asset} owner={owner} />
}

export default MaidsProfileWrapper
