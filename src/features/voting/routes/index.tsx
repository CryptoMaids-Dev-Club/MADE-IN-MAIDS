import { Route, Routes } from 'react-router-dom'
import { VotingTop } from './VotingTop'

export const VotingRoutes = () => (
  <Routes>
    <Route path='' element={<VotingTop />} />
  </Routes>
)

export default VotingRoutes
