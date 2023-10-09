'use client'

import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { User } from '@prisma/client'
import NextLink from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import getNftHolder from '@/app/api/nftHolder/[page]/getNftHolder'
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
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '20px' }}>Rank</TableCell>
              <TableCell sx={{ fontSize: '20px' }}>Icon</TableCell>
              <TableCell sx={{ fontSize: '20px' }}>Address</TableCell>
              <TableCell sx={{ fontSize: '20px' }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdersList.map((holder, index) => (
              <TableRow key={holder.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontSize: '20px' }} component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Avatar src={getUserIcon(holder.address, userInfos)} sx={{ width: 96, height: 96 }} />
                </TableCell>
                <TableCell sx={{ fontSize: '20px' }}>
                  <NextLink href={`/account/${holder.address}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {getUserName(holder.address, userInfos)}
                  </NextLink>
                </TableCell>
                <TableCell sx={{ fontSize: '20px' }}>{holder.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  )
}

export default NFTHolderTable
