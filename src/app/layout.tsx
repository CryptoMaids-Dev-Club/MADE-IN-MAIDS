import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { DotGothic16 } from 'next/font/google'
import { TopBar } from '@/app/(features)/top/_components/TopBar'
import { Footer } from '@/app/_components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Providers } from './providers'
// import './index.css'
import './global.css'

const siteName = 'Made in Maids'
const description = 'Web site created by goshujin sama in the development team'

const dotGothic = DotGothic16({ weight: '400', subsets: ['latin'], variable: '--font-DotGothic16' })

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
    <body className={cn('min-h-screen bg-background antialiased', dotGothic.className)}>
      <Providers>
        <TopBar />
        {children}
        <Toaster />
        <Analytics />
        <Footer />
      </Providers>
    </body>
  </html>
)
export default RootLayout
