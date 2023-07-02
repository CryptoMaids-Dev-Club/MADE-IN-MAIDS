'use client'

import { Box } from '@mui/material'
import Image from 'next/image'

export const Header = () => (
  <Box sx={{ height: '500px', width: 'auto', margin: '2px', padding: '2px', border: '1px solid #ccc' }}>
    <Box sx={{ height: '488px', overflow: 'hidden' }}>
      <Image
        src='/assets/images/123.png'
        alt='header'
        width='2500'
        height='488'
        style={{ overflow: 'hidden', margin: '3px' }}
      />
    </Box>
  </Box>
)

export default Header
