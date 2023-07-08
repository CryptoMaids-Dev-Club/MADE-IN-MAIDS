'use client'

import { AppBar, Box, Typography } from '@mui/material'

export const Footer = () => (
  <AppBar component='footer' position='fixed' sx={{ backgroundColor: '#000000', top: 'auto', bottom: 0 }}>
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant='caption'>©2023 CryptoMaids Made in Maids</Typography>
    </Box>
  </AppBar>
)

export default Footer
