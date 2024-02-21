import AdminPredictionEdit from '../../_components/admin/AdminPredictionEdit'

const AdminPredictionEditPage = ({ params }: { params: { id: string } }) => (
	<AdminPredictionEdit id={Number(params.id)} />
)

export default AdminPredictionEditPage
