import { notFound } from 'next/navigation'
import { getBaseUrl } from '@/lib/getBaseUrl'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import 'server-only'

export default async function getMarketItems() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/marketItems`, {
      next: { revalidate: 600 },
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
    console.error(e)

    return [{}] as MarketItemInfo[]
  }
}
