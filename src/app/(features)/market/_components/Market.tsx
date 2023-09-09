import { Metadata } from 'next'
import { Suspense } from 'react'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import ItemList from './ItemList'

const Market = () => (
  <Suspense fallback={<CenteringCircularProgress />}>
    <ItemList />
  </Suspense>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
