import Container from '@mui/material/Container'
import SetChoiceLength from '@/app/(features)/prediction/_components/admin/SetChoiceLengthForm'
import SetEndTimeForm from '@/app/(features)/prediction/_components/admin/SetEndTimeForm'
import SetPredictionURIForm from '@/app/(features)/prediction/_components/admin/SetPredictionURIForm'
import SetRateForm from '@/app/(features)/prediction/_components/admin/SetRateForm'
import SettleForm from './SettleForm'

type AdminPredictionEditProps = {
  id: number
}

const AdminPredictionEdit = ({ id }: AdminPredictionEditProps) => {
  return (
    <Container>
      <SettleForm id={id} />
      <SetChoiceLength id={id} />
      <SetPredictionURIForm id={id} />
      <SetRateForm id={id} />
      <SetEndTimeForm id={id} />
    </Container>
  )
}

export default AdminPredictionEdit
