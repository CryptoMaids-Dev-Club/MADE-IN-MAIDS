import { Suspense } from 'react'
import { Metadata } from 'next'
import { CenteringCircularProgress } from '@/app/_components/Elements/CenteringCircularProgress'
import { Header } from '@/app/_components/Header'
import ItemList from './ItemList'

const Market = () => (
  <>
    <Header />
    <div className='container mx-auto max-w-max'>
      <Suspense fallback={<CenteringCircularProgress />}>
        <ItemList />
      </Suspense>
    </div>
    <br />
  </>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
