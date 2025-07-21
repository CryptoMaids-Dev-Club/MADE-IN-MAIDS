import type { Metadata } from 'next'
import Prediction from './_components/Prediction'

const PredictionPage = async (params: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params.params
  return <Prediction lang={lang} />
}

export default PredictionPage

export const metadata: Metadata = {
  title: 'Prediction',
}
