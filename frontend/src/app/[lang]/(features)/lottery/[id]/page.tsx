import LotteryDetail from '@/app/[lang]/(features)/lottery/_components/LotteryDetail'

const LotteryDetailPage = ({ params }: { params: { lang: string; id: string } }) => {
  return <LotteryDetail lang={params.lang} lotteryId={Number(params.id)} />
}

export default LotteryDetailPage
