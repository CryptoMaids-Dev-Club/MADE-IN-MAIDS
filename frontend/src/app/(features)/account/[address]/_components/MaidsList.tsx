'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import { useAccount, useSignMessage } from 'wagmi'
import getOwnedNfts from '@/app/api/ownedNfts/[address]/[page]/getOwnedNfts'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { useUpdateUser } from '@/hooks/useUser'
import { getSignatureFromLocalStorage } from '@/utils/signature'
import type { OwnedNFTs } from '@/app/api/ownedNfts/[address]/[page]/ownedNft'
import type { Address } from 'viem'

type MaidsListProps = {
  targetAddress: Address
}

const MaidsList = ({ targetAddress }: MaidsListProps) => {
  const [maidsList, setMaidsList] = useState<OwnedNFTs[]>([])
  const [hasMore, setHasMore] = useState(true)
  const { address } = useAccount()
  const updateUserInfo = useUpdateUser(address ?? '0x0')

  const { toast } = useToast()

  const { signMessageAsync } = useSignMessage()

  if (targetAddress === undefined) return <Typography>Invalid Address</Typography>

  const loadMore = async (page: number) => {
    const ownedNfts = await getOwnedNfts(targetAddress, page)
    if (ownedNfts === null || ownedNfts.assets === undefined) {
      setHasMore(false)

      return
    }
    setMaidsList([...maidsList, ...ownedNfts.assets])

    if (ownedNfts.next_page === undefined) {
      setHasMore(false)
    }
  }

  const handleSaveClick = async (newIconUrl: string) => {
    if (address === undefined) return

    const signature = getSignatureFromLocalStorage(address)
    if (signature) {
      await updateUserInfo.mutate({ name: '', address, iconUrl: newIconUrl, signature })
      toast({
        title: 'Successfully updated!',
        duration: 3000,
      })
    } else {
      signMessageAsync({ message: 'Update Profile' }).then(async (data) => {
        if (address === undefined) return
        try {
          await updateUserInfo.mutate({ name: '', address, iconUrl: newIconUrl, signature: data })
          localStorage.setItem(address, JSON.stringify({ signature: data, timestamp: new Date().getTime() }))
          toast({
            title: 'Successfully updated!',
            duration: 3000,
          })
        } catch (e) {
          console.error(e)
        }
      })
    }
  }

  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={<Typography key={0}>Loading...</Typography>}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {maidsList.map((nft) => (
          <div key={nft.image}>
            <Link href={`/detail/${nft.token_id}`}>
              <div className='relative overflow-hidden bg-cover bg-no-repeat'>
                <Image
                  className='transition duration-300 hover:scale-110'
                  height={600}
                  width={600}
                  src={nft.image}
                  alt={nft.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </Link>
            <div className='flex w-full flex-row bg-gray-800 px-4 py-2'>
              <Typography variant='h4' className='truncate'>
                {nft.name}
              </Typography>
              {address && address.toLowerCase() === nft.owner && (
                <Badge className='ml-4 cursor-pointer' onClick={() => handleSaveClick(nft.image)}>
                  Set as Icon
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default MaidsList
