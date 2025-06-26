import '@rainbow-me/rainbowkit/styles.css'
import { TopBar } from '@/app/[lang]/(features)/top/_components/TopBar'
import { Footer } from '@/app/[lang]/_components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { dir } from 'i18next'
import { DotGothic16 } from 'next/font/google'
import { Providers } from './providers'
import './index.css'
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

const RootLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) => {
  const { lang } = await params

  return (
    <html lang={lang} dir={dir(lang)}>
      <body className={cn('min-h-screen w-screen bg-neutral-950 antialiased', dotGothic.className)}>
        <Providers lang={lang}>
          <TopBar />
          <main className='bg-neutral-950 pb-4'>{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout
