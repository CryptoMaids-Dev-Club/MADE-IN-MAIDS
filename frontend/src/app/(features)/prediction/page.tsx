import { Metadata } from 'next'
import Prediction from './_components/Prediction'

const PredictionPage = () => <Prediction />

export default PredictionPage

export const metadata: Metadata = {
  title: 'Prediction',
}
