import type { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import { Typography } from '@/components/ui/typography'
import { getAllUserInfo } from '@/server/user/query'
import RankingTables from './RankingTables'

// Consider adding header image for visual appeal
const Ranking = async () => {
  noStore()
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
