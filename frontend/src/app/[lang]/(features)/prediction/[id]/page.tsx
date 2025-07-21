import PredictionDetail from '../_components/PredictionDetail'

const PredictionDetailPage = async (params: { params: Promise<{ id: string }> }) => {
  const { id } = await params.params
  return <PredictionDetail id={Number(id)} />
}

export default PredictionDetailPage
