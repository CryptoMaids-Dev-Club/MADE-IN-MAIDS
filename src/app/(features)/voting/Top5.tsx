import getTopAssets from '@/app/api/voting/[slug]/getTopAssets'
import { TopImage } from './TopImage'
import type { TopAsset } from '@/app/api/voting/[slug]/voting'

export const Top5 = async () => {
  const topAssets = (await getTopAssets({ slug: 5 })) as unknown as TopAsset[]

  return <TopImage topAssets={topAssets} />
}

export default Top5
