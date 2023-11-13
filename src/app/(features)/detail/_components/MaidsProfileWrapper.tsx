import { notFound } from 'next/navigation'
import getAsset from '@/app/api/asset/[id]/getAsset'
import getNftOwner from '@/app/api/nftOwner/[id]/getNftOwner'
import { prisma } from '@/lib/prisma'
import MaidsProfile from './MaidsProfile'

type NFTProfileProps = {
  id: number
}

const MaidsProfileWrapper = async ({ id }: NFTProfileProps) => {
  // const maidProfile = await getMaidProfile({ id })
  const maidProfile = await prisma.maidProfile.findUnique({
    where: {
      id: Number(id),
    },
  })
  if (!maidProfile) return notFound()

  const owner = await getNftOwner({ id })
  const asset = await getAsset({ id })

  return <MaidsProfile profile={{ ...maidProfile, id }} asset={asset} owner={owner} />
}

export default MaidsProfileWrapper
