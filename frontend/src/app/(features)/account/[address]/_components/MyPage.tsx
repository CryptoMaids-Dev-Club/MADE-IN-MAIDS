import { Suspense } from 'react'
import { Metadata } from 'next'
import { Typography } from '@/components/ui/typography'
import MaidsList from './MaidsList'
import Profile from './Profile'
import ProfileSkelton from './ProfileSkelton'

type MyPageProps = {
  address: string
}

const MyPage = ({ address }: MyPageProps) => (
  <div className='container mx-auto mt-4 max-w-7xl'>
    <Suspense fallback={<ProfileSkelton />}>
      <Profile address={address} />
    </Suspense>
    <Typography variant='h1'>Your Maids</Typography>
    <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-4'>
      <MaidsList targetAddress={address} />
    </div>
    <br />
  </div>
)

export default MyPage

export const metadata: Metadata = {
  title: 'MyPage',
}
