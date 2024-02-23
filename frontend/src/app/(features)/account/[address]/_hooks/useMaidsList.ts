import { useState, useCallback } from 'react'
import getOwnedNfts from '@/app/api/ownedNfts/[address]/[page]/getOwnedNfts'
import type { OwnedNFTs } from '@/app/api/ownedNfts/[address]/[page]/ownedNft'
import type { Address } from 'viem'

export const useMaidsList = (targetAddress: Address) => {
  const [maidsList, setMaidsList] = useState<OwnedNFTs[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async (page: number) => {
    try {
        const ownedNfts = await getOwnedNfts(targetAddress, page)
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
