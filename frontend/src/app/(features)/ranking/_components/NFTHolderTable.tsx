'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { UserRound } from 'lucide-react'
import NextLink from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import getNftHolder from '@/app/api/nftHolder/[page]/getNftHolder'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { getUserIcon, getUserName } from '../utils'
import type { NFTHolder } from '@/app/api/nftHolder/[page]/nftHolder'

type NFTHolderTableProps = {
  userInfos: User[]
}

const NFTHolderTable = ({ userInfos }: NFTHolderTableProps) => {
  const [holdersList, setHoldersList] = useState<NFTHolder[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async (page: number) => {
    if (page > 5) {
      // until 100 owner
      setHasMore(false)

      return
    }

    const holders = await getNftHolder({ page })

    if (holders.length < 1) {
      setHasMore(false)

      return
    }
    setHoldersList([...holdersList, ...holders])
  }

  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={<Typography key={0}>Loading...</Typography>}>
      <Table aria-label='simple table'>
        <TableHeader>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Icon</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdersList.map((holder, index) => (
            <TableRow key={holder.address}>
              <TableCell scope='row'>{index + 1}</TableCell>
              <TableCell>
                <Avatar className='size-24'>
                  <AvatarImage src={getUserIcon(holder.address, userInfos)} />
                  <AvatarFallback>
                    <UserRound size={50} />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <NextLink href={`/account/${holder.address}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {getUserName(holder.address, userInfos)}
                </NextLink>
              </TableCell>
              <TableCell>{holder.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  )
}

export default NFTHolderTable
