import { Metadata } from 'next'
import Market from './_components/Market'

const MarketPage = ({ params }: { params: { lang: string } }) => <Market lang={params.lang} />

export default MarketPage

export const metadata: Metadata = {
  title: 'Market',
}
