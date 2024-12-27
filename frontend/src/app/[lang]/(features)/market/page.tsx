import type { Metadata } from 'next'
import Market from './_components/Market'

const MarketPage = async (params: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params.params
  return <Market lang={lang} />
}

export default MarketPage

export const metadata: Metadata = {
  title: 'Market',
}
