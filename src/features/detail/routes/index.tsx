import { Route, Routes } from 'react-router-dom'
import Detail from './Detail'

export const DetailRoutes = () => (
  <Routes>
    <Route path='' element={<Detail />} />
  </Routes>
)

export default DetailRoutes
