'use client'

import type { MaidsHolder } from '@/app/[[...route]]/maidsHolder'
import type { AppType } from '@/app/[[...route]]/route'
import { useLanguage } from '@/app/i18n/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import type { User } from '@prisma/client'
import { hc } from 'hono/client'
import { UserRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { getUserIcon, getUserName } from '../utils'

type MaidsHolderTableProps = {
  userInfos: User[]
}

const client = hc<AppType>('/')

const MaidsHolderTable = ({ userInfos }: MaidsHolderTableProps) => {
  const { language } = useLanguage()

  const [holdersList, setHoldersList] = useState<MaidsHolder[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async (page: number) => {
    if (page > 5) {
      // until 100 owner
      setHasMore(false)

      return
    }

    const res = await client.api.maidsHolder[':page'].$get({
      param: {
        page: page.toString(),
      },
    })
    const holders = await res.json()

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
                <Link
                  href={`/${language}/account/${holder.wallet_address}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {getUserName(holder.wallet_address, userInfos)}
                </Link>
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
