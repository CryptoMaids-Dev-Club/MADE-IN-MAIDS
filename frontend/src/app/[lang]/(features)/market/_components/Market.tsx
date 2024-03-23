import { Suspense } from 'react'
import { Metadata } from 'next'
import { CenteringCircularProgress } from '@/app/[lang]/_components/Elements/CenteringCircularProgress'
import { Header } from '@/app/[lang]/_components/Header'
import ItemList from './ItemList'

const Market = () => (
  <>
    <Header />
    <div className='mt-8 flex items-center justify-center pb-12'>
      <Suspense fallback={<CenteringCircularProgress />}>
        <ItemList />
      </Suspense>
    </div>
  </>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
