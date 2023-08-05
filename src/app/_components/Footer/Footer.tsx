import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Footer = () => (
  <AppBar component='footer' position='fixed' sx={{ backgroundColor: '#000000', top: 'auto', bottom: 0 }}>
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant='caption'>©2023 CryptoMaids Made in Maids</Typography>
    </Box>
  </AppBar>
)

export default Footer
