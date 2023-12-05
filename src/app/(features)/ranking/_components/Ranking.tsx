import { Metadata } from 'next'
import getAllUserInfo from '@/app/api/user/getAllUserInfo'

import { Typography } from '@/components/ui/typography'
import RankingTables from './RankingTables'

// TODO: Insert Maids Image
const Ranking = async () => {
  const userInfos = await getAllUserInfo()

  return (
    <div className='container mx-auto my-8 max-w-6xl'>
      <Typography variant='h1' className='my-2 text-center text-pink-500'>
        Holder Ranking
      </Typography>
      <RankingTables userInfos={userInfos} />
    </div>
  )
}

export default Ranking

export const metadata: Metadata = {
  title: 'Ranking',
}
