'use client'

import { AppBar, Box, Typography } from '@mui/material'

export const Footer = () => (
  <AppBar
    component='footer'
    position='static'
    sx={{ backgroundColor: '#000000', position: 'absolute', bottom: 0, width: '100%' }}>
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant='caption'>©2023 CryptoMaids Made in Maids</Typography>
    </Box>
  </AppBar>
)

export default Footer
