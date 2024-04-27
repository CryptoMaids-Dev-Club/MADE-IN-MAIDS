import { redirect } from 'next/navigation'
import LotteryDetail from '@/app/[lang]/(features)/lottery/_components/LotteryDetail'

const LotteryDetailPage = ({ params }: { params: { lang: string; id: string } }) => {
  if (Number(params.id) === 0) {
    redirect('/lottery')
  }

  return <LotteryDetail lang={params.lang} lotteryId={Number(params.id)} />
}

export default LotteryDetailPage
