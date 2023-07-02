import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { Metadata } from 'next'
import ItemList from './components/ItemList'

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
