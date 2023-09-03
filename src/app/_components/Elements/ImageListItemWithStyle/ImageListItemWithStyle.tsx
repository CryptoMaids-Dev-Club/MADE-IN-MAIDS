'use client'

import ImageListItem from '@mui/material/ImageListItem'
import { styled } from '@mui/material/styles'

export const ImageListItemWithStyle = styled(ImageListItem)(() => ({
  '&:hover': {
    opacity: '0.5',
    transition: '0.3s',
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '600px',
  },
}))
