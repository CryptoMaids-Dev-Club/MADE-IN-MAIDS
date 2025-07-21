import AdminPredictionEdit from '../../_components/admin/AdminPredictionEdit'

const AdminPredictionEditPage = async (params: { params: Promise<{ id: string }> }) => {
  const { id } = await params.params
  return <AdminPredictionEdit id={Number(id)} />
}

export default AdminPredictionEditPage
