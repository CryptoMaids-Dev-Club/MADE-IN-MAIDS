import { notFound } from 'next/navigation'
import { getBaseUrl } from '@/lib/getBaseUrl'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import 'server-only'

export default async function getMarketItems() {
  console.log('getMarketItems')

  try {
    console.log(`${getBaseUrl()}/api/marketItems`)
    const res = await fetch(`${getBaseUrl()}/api/marketItems`, {
      next: { revalidate: 600 },
    })

    console.log('res: ' + res.headers.get('content-type'))

    if (res.headers.get('content-type')?.includes('application/json') === false) {
      console.log('not json')
      notFound()
    }

    if (!res.ok) {
      console.log('not ok')
      throw new Error('Something went wrong!')
    }

    console.log('ok')
    const marketItems = (await res.json()) as MarketItemInfo[]

    if (marketItems.length === 0) {
      console.log('not found')
      notFound()
    }

    console.log('return')

    return marketItems
  } catch (e) {
    console.log('error')
    console.error(e)

    return [] as MarketItemInfo[]
  }
}
