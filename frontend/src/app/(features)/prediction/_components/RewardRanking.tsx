import { getTopUserInfo } from '@/app/(features)/prediction/_api/query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const RewardRanking = async () => {
  const topUserInfo = await getTopUserInfo()
  return (
    <div className='container mx-auto max-w-7xl'>
      <Table aria-label='simple table'>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Reward Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topUserInfo.map((row, index) => (
            <TableRow key={row.user}>
              <TableCell scope='row'>{index + 1}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.amount} $MAIDS</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RewardRanking
