import getTopAssets from '@/app/api/voting/[slug]/getTopAssets'
import { TopImage } from './TopImage'

export const Top5 = async () => {
  const topAssets = await getTopAssets({ slug: 5 })

  return <TopImage topAssets={topAssets} />
}

export default Top5
