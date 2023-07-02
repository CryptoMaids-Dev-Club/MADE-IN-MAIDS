import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
import TopLayout from './TopLayout'

const siteName = 'Made in Maids'
const description = 'Web site created by goshujin sama in the development team'
const url = 'https://本番のドメイン'

export const metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
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
  verification: {
    google: 'サーチコンソールのやつ',
  },
  alternates: {
    canonical: url,
  },
}

export const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body>
      <Providers>
        <TopLayout>{children}</TopLayout>
      </Providers>
    </body>
  </html>
)

export default RootLayout
