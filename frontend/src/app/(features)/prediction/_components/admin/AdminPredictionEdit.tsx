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
		<div className='container mx-auto my-8 max-w-6xl'>
			<SettleForm id={id} />
			<SetChoiceLength id={id} />
			<SetPredictionURIForm id={id} />
			<SetRateForm id={id} />
			<SetEndTimeForm id={id} />
		</div>
	)
}

export default AdminPredictionEdit
