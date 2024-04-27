import { Metadata } from 'next'
import Lottery from '@/app/[lang]/(features)/lottery/_components/Lottery'

const LotteryPage = ({ params }: { params: { lang: string } }) => <Lottery lang={params.lang} />

export default LotteryPage

export const metadata: Metadata = {
  title: 'Lottery',
}
