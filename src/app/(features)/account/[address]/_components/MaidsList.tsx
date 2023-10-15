/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Chip from '@mui/material/Chip'
import ImageList from '@mui/material/ImageList'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import { useAccount, useSignMessage } from 'wagmi'
import { ImageListItemWithStyle } from '@/app/_components/Elements/ImageListItemWithStyle'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import getOwnedNfts from '@/app/api/ownedNfts/[address]/[page]/getOwnedNfts'
import updateUserInfo from '@/app/api/user/updateUserInfo'
import { getSignatureFromLocalStorage } from '@/lib/signature'
import type { OwnedNFTs } from '@/app/api/ownedNfts/[address]/[page]/ownedNft'

type MaidsListProps = {
  targetAddress: string
}

const MaidsList = ({ targetAddress }: MaidsListProps) => {
  const [maidsList, setMaidsList] = useState<OwnedNFTs[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [iconUrl, setIconUrl] = useState('')
  const { address } = useAccount()
  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateUserInfo({ name: '', address, iconUrl, signature: data })
        localStorage.setItem(address, JSON.stringify({ signature: data, timestamp: new Date().getTime() }))
        openSnackbar()
      } catch (e) {
        console.error(e)
      }
    },
  })

  if (targetAddress === undefined) return <Typography>Invalid Address</Typography>

  const loadMore = async (page: number) => {
    const ownedNfts = await getOwnedNfts({ address: targetAddress, page })
    if (ownedNfts === undefined || ownedNfts.assets === undefined) {
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
      await updateUserInfo({ name: '', address, iconUrl: newIconUrl, signature })
      openSnackbar()
    } else {
      signMessage()
    }

    setIconUrl(newIconUrl)
  }

  return (
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={<Typography key={0}>Loading...</Typography>}>
        <ImageList
          sx={{ height: 600 * Math.ceil(maidsList.length / 3) }}
          cols={maidsList.length >= 3 ? 3 : maidsList.length + 1}>
          {maidsList.map((nft) => (
            <ImageListItemWithStyle key={nft.image}>
              <Link href={`/detail/${nft.token_id}`}>
                <img src={nft.image} srcSet={nft.image} alt={nft.name} loading='lazy' />
              </Link>
              <ImageListItemBar
                title={nft.name}
                actionIcon={
                  address &&
                  address.toLowerCase() === nft.owner && (
                    <Chip
                      label='Set As Icon'
                      variant='outlined'
                      size='small'
                      onClick={() => handleSaveClick(nft.image)}
                    />
                  )
                }
              />
            </ImageListItemWithStyle>
          ))}
        </ImageList>
      </InfiniteScroll>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
        Successfully updated! Please refresh the page.
      </Snackbar>
    </>
  )
}

export default MaidsList
