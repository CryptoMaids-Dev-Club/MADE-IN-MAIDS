import '@rainbow-me/rainbowkit/styles.css'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { Providers } from './providers'
import { TopBar } from './TopBar'
import './index.css'

const siteName = 'Made in Maids'
const description = 'Web site created by goshujin sama in the development team'

export const metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@CryptoMaids',
    creator: '@CryptoMaids',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body>
      <Providers>
        <ThemeProvider theme={theme}>
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.87)' }}>
            <CssBaseline />
            <TopBar />
            <Container maxWidth={false} sx={{ bgcolor: 'rgba(0,0,0,0.87)' }}>
              <Box sx={{ height: '100%', marginTop: '10px', width: '100%' }}>{children}</Box>
            </Container>
          </Box>
        </ThemeProvider>
      </Providers>
    </body>
  </html>
)
export default RootLayout
