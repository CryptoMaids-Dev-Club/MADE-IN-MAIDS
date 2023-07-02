'use client'

import { Box, Container, CssBaseline } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { TopBar } from './TopBar'

import './index.css'

type TopLayoutProps = {
  children: React.ReactNode
}

const TopLayout = ({ children }: TopLayoutProps) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.87)' }}>
        <CssBaseline />
        <TopBar />
        <Container maxWidth={false} sx={{ bgcolor: 'rgba(0,0,0,0.87)' }}>
          <Box sx={{ height: '100%', marginTop: '10px', width: '100%' }}>{children}</Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
export default TopLayout
