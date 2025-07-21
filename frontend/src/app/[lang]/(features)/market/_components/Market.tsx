import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CenteringCircularProgress } from '@/app/[lang]/_components/Elements/CenteringCircularProgress'
import { Header } from '@/app/[lang]/_components/Header'
import ItemList from './ItemList'

const Market = ({ lang }: { lang: string }) => (
  <>
    <Header />
    <div className='mt-8 flex items-center justify-center pb-12'>
      <Suspense fallback={<CenteringCircularProgress />}>
        <ItemList lang={lang} />
      </Suspense>
    </div>
  </>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
