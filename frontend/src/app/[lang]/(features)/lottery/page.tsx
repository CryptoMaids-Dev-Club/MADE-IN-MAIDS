import Lottery from '@/app/[lang]/(features)/lottery/_components/Lottery'
import type { Metadata } from 'next'

const LotteryPage = async (props: { params: Promise<{ lang: string }> }) => {
  const { lang } = await props.params
  return <Lottery lang={lang} />
}

export default LotteryPage

export const metadata: Metadata = {
  title: 'Lottery',
}
