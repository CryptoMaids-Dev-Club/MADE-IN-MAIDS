'use client'

import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroller'
import { useState } from 'react'
import getNftHolder from '@/app/api/nftHolder/[page]/getNftHolder'
import Typography from '@mui/material/Typography'
import type { NFTHolder } from '@/app/api/nftHolder/[page]/nftHolder'

const NFTHolderTable = () => {
  const [holdersList, setHoldersList] = useState<NFTHolder[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async (page: number) => {
    if (page > 5) {
      // until 100 owner
      console.log('over 10')
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
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<Typography sx={{ color: 'white' }}>Loading...</Typography>}>
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
              <TableRow key={holder.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'white', fontSize: '20px' }} component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Avatar src='/images/icon.png' sx={{ width: 96, height: 96 }} />
                </TableCell>
                <TableCell sx={{ color: 'white', fontSize: '20px' }}>{holder.address}</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '20px' }}>{holder.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  )
}

export default NFTHolderTable
