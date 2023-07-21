import { VERCEL_URL } from '@/config'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import 'server-only'

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default async function getMarketItems() {
  const res = await fetch(`${VERCEL_URL}/api/marketItems`)
  console.log(`${VERCEL_URL}/api/marketItems`)

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const marketItems = (await res.json()) as MarketItemInfo[]

  return marketItems
}
