import { useState, useCallback } from 'react'
import { hc } from 'hono/client'
import { OwnedNFTs } from '@/app/api/[[...route]]/ownedNfts'
import { AppType } from '@/app/api/[[...route]]/route'
import type { Address } from 'viem'

export type UseMaidsListReturnType = {
    maidsList: OwnedNFTs[]
    hasMore: boolean
    loadMore: (page: number) => Promise<void>
}

const client = hc<AppType>('/')

export const useMaidsList = (targetAddress: Address): UseMaidsListReturnType => {
  const [maidsList, setMaidsList] = useState<OwnedNFTs[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async (page: number) => {
    try {
        const res = await client.api.ownedNfts[':address'][':page'].$get({
          param: {
            address: targetAddress,
            page: page.toString(),
          }
        })
        const ownedNfts = await res.json()
        if (ownedNfts === null || ownedNfts.assets === undefined) {
            setHasMore(false)
            return
        }
        // Duplicate values when strict mode is enabled.
        setMaidsList((prevMaidsList) => [...prevMaidsList, ...ownedNfts.assets].filter((maid, index, self) => 
            index === self.findIndex((m) => m.token_id === maid.token_id)
        ))
        if (ownedNfts.next_page === undefined) {
          setHasMore(false)
        }
    } catch (error) {
      console.error('Failed to load more NFTs:', error)
      setHasMore(false)
    }
  }, [targetAddress])

  return { maidsList, hasMore, loadMore }
}
