'use client'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loading = () => (
  <Box justifyContent='center' display='flex'>
    <CircularProgress color='primary' size='xl' />
  </Box>
)

export default Loading
