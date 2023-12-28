import { getTopAssets } from '@/server/voting/query'
import { TopImage } from './TopImage'

export const Top5 = async () => {
  const topAssets = await getTopAssets(5)

  return <TopImage topAssets={topAssets} />
}

export default Top5
