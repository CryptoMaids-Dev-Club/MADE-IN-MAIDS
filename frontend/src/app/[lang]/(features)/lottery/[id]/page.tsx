import LotteryDetail from '@/app/[lang]/(features)/lottery/_components/LotteryDetail'

const LotteryDetailPage = ({ params }: { params: { id: string } }) => {
  return <LotteryDetail id={Number(params.id)} />
}

export default LotteryDetailPage
