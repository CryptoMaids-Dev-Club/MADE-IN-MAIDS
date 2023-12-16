import dynamic from 'next/dynamic'
import getAsset from '@/app/api/asset/[id]/getAsset'
import getMaidProfile from '@/app/api/maidsProfile/getMaidProfile'
import getNftOwner from '@/app/api/nftOwner/[id]/getNftOwner'

type NFTProfileProps = {
  id: number
}

const MaidsProfile = dynamic(() => import('./MaidsProfile'), { ssr: false })

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  const maidProfile = await getMaidProfile({ id })
  const owner = await getNftOwner({ id })
  const asset = await getAsset({ id })

  return <MaidsProfile profile={{ ...maidProfile, id }} asset={asset} owner={owner} />
}

export default MaidsProfileWrapper
