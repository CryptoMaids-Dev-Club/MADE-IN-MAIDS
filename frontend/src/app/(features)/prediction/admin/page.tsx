import { Metadata } from 'next'
import AdminPredictionFactory from '@/app/(features)/prediction/_components/admin/AdminPredictionFactory'

const PredictionPage = () => <AdminPredictionFactory />

export default PredictionPage

export const metadata: Metadata = {
	title: 'Prediction',
}
