import PredictionDetail from '../_components/PredictionDetail'

const PredictionDetailPage = ({ params }: { params: { id: string } }) => <PredictionDetail id={Number(params.id)} />

export default PredictionDetailPage
