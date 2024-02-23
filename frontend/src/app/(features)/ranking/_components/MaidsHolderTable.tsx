'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { UserRound } from 'lucide-react'
import NextLink from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import getMaidsHolder from '@/app/api/maidsHolder/[page]/getMaidsHolder'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { getUserIcon, getUserName } from '../utils'
import type { MaidsHolder } from '@/app/api/maidsHolder/[page]/maidsHolder'

type MaidsHolderTableProps = {
  userInfos: User[]
}

const MaidsHolderTable = ({ userInfos }: MaidsHolderTableProps) => {
  const [holdersList, setHoldersList] = useState<MaidsHolder[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async (page: number) => {
    if (page > 5) {
      // until 100 owner
      setHasMore(false)

      return
    }

    const holders = await getMaidsHolder({ page })

    if (holders === null || holders.length < 1) {
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
            <TableRow key={holder.wallet_address}>
              <TableCell scope='row'>{index + 1}</TableCell>
              <TableCell>
                <Avatar className='size-24'>
                  <AvatarImage src={getUserIcon(holder.wallet_address, userInfos)} />
                  <AvatarFallback>
                    <UserRound size={50} />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <NextLink
                  href={`/account/${holder.wallet_address}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  {getUserName(holder.wallet_address, userInfos)}
                </NextLink>
              </TableCell>
              <TableCell>{Math.floor(Number(holder.amount))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  )
}

export default MaidsHolderTable
