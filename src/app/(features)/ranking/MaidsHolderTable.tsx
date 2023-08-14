'use client'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import InfiniteScroll from 'react-infinite-scroller'
import { useState } from 'react'
import NextLink from 'next/link'
import getMaidsHolder from '@/app/api/maidsHolder/[page]/getMaidsHolder'
import Typography from '@mui/material/Typography'
import { User } from '@prisma/client'
import type { MaidsHolder } from '@/app/api/maidsHolder/[page]/maidsHolder'
import { getUserIcon, getUserName } from './utils'

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

    if (holders === undefined || holders.length < 1) {
      setHasMore(false)

      return
    }
    setHoldersList([...holdersList, ...holders])
  }

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      loader={
        <Typography key={0} sx={{ color: 'white' }}>
          Loading...
        </Typography>
      }>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', fontSize: '20px' }}>Rank</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '20px' }}>Icon</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '20px' }}>Address</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '20px' }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdersList.map((holder, index) => (
              <TableRow key={holder.wallet_address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'white', fontSize: '20px' }} component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Avatar src={getUserIcon(holder.wallet_address, userInfos)} sx={{ width: 96, height: 96 }} />
                </TableCell>
                <TableCell sx={{ color: 'white', fontSize: '20px' }}>
                  <NextLink
                    href={`/account/${holder.wallet_address}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    {getUserName(holder.wallet_address, userInfos)}
                  </NextLink>
                </TableCell>
                <TableCell sx={{ color: 'white', fontSize: '20px' }}>{Math.floor(Number(holder.amount))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  )
}

export default MaidsHolderTable
