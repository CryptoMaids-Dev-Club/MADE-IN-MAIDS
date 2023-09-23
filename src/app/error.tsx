'use client'

import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box sx={{ height: '100%', width: '100%', bgcolor: 'black' }}>
      <Typography ml='7px' sx={{ color: 'white' }}>
        Ooops, something went wrong. Please refresh.
      </Typography>
      <Button className='mt-4' onClick={() => reset()}>
        Refresh
      </Button>
    </Box>
  )
}
