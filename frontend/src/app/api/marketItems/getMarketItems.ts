import { notFound } from 'next/navigation'
import { getBaseUrl } from '@/lib/getBaseUrl'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import 'server-only'

export default async function getMarketItems() {
  console.log('getMarketItems')

  try {
    const res = await fetch(`${getBaseUrl()}/api/marketItems`, {
      next: { revalidate: 600 },
    })

    if (!res.ok) {
      console.log('not ok')
      throw new Error('Something went wrong!')
    }

    const marketItems = (await res.json()) as MarketItemInfo[]

    if (marketItems.length === 0) {
      console.log('not found')
      notFound()
    }

    return marketItems
  } catch (e) {
    console.log('error')
    console.error(e)

    return [] as MarketItemInfo[]
  }
}
