import getMaidProfile from '@/app/api/maidsProfile/[id]/getMaidProfile'
import getNftOwner from '@/app/api/nftOwner/[id]/getNftOwner'
import MaidsProfile from './MaidsProfile'

type NFTProfileProps = {
  id: number
}

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  const maidProfile = await getMaidProfile({ id })
  const owner = await getNftOwner({ id })

  return <MaidsProfile profile={{ ...maidProfile, id }} owner={owner} />
}

export default MaidsProfileWrapper
