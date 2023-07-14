import Box from '@mui/material/Box'
import Image from 'next/image'

export const Header = () => (
  <Box
    display={{ xs: 'none', sm: 'block' }}
    sx={{ height: '500px', width: 'auto', margin: '2px', padding: '2px', border: '1px solid #ccc' }}>
    <Box sx={{ height: '488px', overflow: 'hidden' }}>
      <Image
        src='/images/123.png'
        alt='header'
        width='2500'
        height='488'
        style={{ overflow: 'hidden', margin: '3px' }}
      />
    </Box>
  </Box>
)

export default Header
