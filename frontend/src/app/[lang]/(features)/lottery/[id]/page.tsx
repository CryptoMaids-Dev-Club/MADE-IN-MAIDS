import LotteryDetail from '@/app/[lang]/(features)/lottery/_components/LotteryDetail'

const LotteryDetailPage = async (props: { params: Promise<{ lang: string; id: string }> }) => {
  const { lang, id } = await props.params
  return <LotteryDetail lang={lang} lotteryId={Number(id)} />
}

export default LotteryDetailPage
