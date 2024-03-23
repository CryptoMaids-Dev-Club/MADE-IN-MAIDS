import { Metadata } from 'next'
import Lottery from '@/app/[lang]/(features)/lottery/_components/Lottery'

const LotteryPage = () => <Lottery />

export default LotteryPage

export const metadata: Metadata = {
  title: 'Lottery',
}
