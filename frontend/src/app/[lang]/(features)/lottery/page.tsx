import Lottery from '@/app/[lang]/(features)/lottery/_components/Lottery'
import type { Metadata } from 'next'

const LotteryPage = async (params: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params.params
  return <Lottery lang={lang} />
}

export default LotteryPage

export const metadata: Metadata = {
  title: 'Lottery',
}
