import '@rainbow-me/rainbowkit/styles.css'
import Box from '@mui/material/Box'
import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/app/_components/Footer'
import { TopBar } from './TopBar'
import { Providers } from './providers'
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
        <Box>
          <TopBar />
          <Box sx={{ marginTop: '10px', width: '100%' }}>
            {children}
            <Analytics />
          </Box>
          <Footer />
        </Box>
      </Providers>
    </body>
  </html>
)
export default RootLayout
