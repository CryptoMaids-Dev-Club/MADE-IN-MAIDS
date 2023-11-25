import { Suspense } from 'react'
import { Metadata } from 'next'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import { Header } from '@/app/_components/Header'
import ItemList from './ItemList'

const Market = () => (
  <>
    <Header />
    <Suspense fallback={<CenteringCircularProgress />}>
      <ItemList />
    </Suspense>
  </>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
