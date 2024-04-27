import { Metadata } from 'next'
import Prediction from './_components/Prediction'

const PredictionPage = ({ params }: { params: { lang: string } }) => <Prediction lang={params.lang} />

export default PredictionPage

export const metadata: Metadata = {
  title: 'Prediction',
}
