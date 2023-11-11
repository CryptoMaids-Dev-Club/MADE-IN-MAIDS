import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import getTopUser from '@/app/api/prediction/topUser/getTopUserInfo'

const RewardRanking = async () => {
  const topUserInfo = await getTopUser()
  return (
    <Container>
      <TableContainer component={Paper} sx={{ mt: '10px' }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Reward Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topUserInfo.map((row, index) => (
              <TableRow key={row.user} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontSize: '20px' }} component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ fontSize: '20px' }}>{row.user}</TableCell>
                <TableCell sx={{ fontSize: '20px' }}>{row.amount} $MAIDS</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default RewardRanking
