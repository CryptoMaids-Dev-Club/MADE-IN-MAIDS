'use client'

import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d87274',
      light: '#ffa2a3',
      dark: 'lightblue',
    },
    background: {
      default: 'black',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'slategray',
          color: 'gold',
        },
      },
    },
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
