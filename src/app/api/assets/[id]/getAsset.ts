import { VERCEL_URL } from '@/config'
import type { AssetInfo } from './asset'
import 'server-only'

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default async function getAsset({ id }: { id: string }) {
  const res = await fetch(`${VERCEL_URL}/api/assets/${id}`)

  // if (!res.ok) {
  //   throw new Error('Something went wrong!')
  // }

  const asset = (await res.json()) as AssetInfo

  return asset
}
