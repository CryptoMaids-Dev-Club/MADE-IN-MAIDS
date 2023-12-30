import { Suspense } from 'react'
import { Address } from 'viem'
import { Typography } from '@/components/ui/typography'
import MaidsList from './MaidsList'
import Profile, { ProfileSkelton } from './Profile'

type MyPageProps = {
  address: Address
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
