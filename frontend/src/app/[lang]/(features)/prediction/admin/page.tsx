import type { Metadata } from 'next'
import AdminPredictionFactory from '@/app/[lang]/(features)/prediction/_components/admin/AdminPredictionFactory'

const PredictionPage = () => <AdminPredictionFactory />

export default PredictionPage

export const metadata: Metadata = {
  title: 'Prediction',
}
