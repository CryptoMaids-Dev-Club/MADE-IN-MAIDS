import { getBaseUrl } from '@/lib/getBaseUrl'
import { notFound } from 'next/navigation'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import 'server-only'

export default async function getMarketItems() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/marketItems`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const marketItems = (await res.json()) as MarketItemInfo[]

    if (marketItems.length === 0) {
      notFound()
    }

    return marketItems
  } catch (e) {
    console.log(e)

    return [{}] as MarketItemInfo[]
  }
}
