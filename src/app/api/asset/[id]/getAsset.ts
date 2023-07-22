import { getBaseUrl } from '@/lib/getBaseUrl'
import type { AssetInfo } from './asset'
import 'server-only'

export default async function getAsset({ id }: { id: string }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/asset/${id}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const asset = (await res.json()) as AssetInfo

    return asset
  } catch (e) {
    return {} as AssetInfo
  }
}
