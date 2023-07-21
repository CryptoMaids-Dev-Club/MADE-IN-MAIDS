import { VERCEL_URL } from '@/config'
import type { NFTMetadata } from './metadata'
import 'server-only'

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default async function getAsset({ id }: { id: string }) {
  const res = await fetch(`${VERCEL_URL}/api/metadata/${id}`)

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const metadata = (await res.json()) as NFTMetadata

  return metadata
}
