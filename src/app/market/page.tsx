import { Header } from '@/app/_components/Header'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import ItemList from './ItemList'

const Market = () => (
  <>
    <Header />
    <ItemList />
    <Footer />
  </>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
