'use client'

import createTheme from '@mui/material/styles/createTheme'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'DotGothic16',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'Roboto',
    ].join(','),
  },
})

export default theme
