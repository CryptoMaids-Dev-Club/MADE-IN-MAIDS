'use client'

import { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, react/function-component-definition
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
