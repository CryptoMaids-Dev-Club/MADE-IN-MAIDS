import PredictionDetail from '../_components/PredictionDetail'

const PredictionDetailPage = ({ params }: { params: { id: number } }) => <PredictionDetail id={params.id} />

export default PredictionDetailPage
