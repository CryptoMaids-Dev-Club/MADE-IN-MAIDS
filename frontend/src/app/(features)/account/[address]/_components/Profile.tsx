import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { getUserInfo } from '@/server/user/query'
import ProfileAvatar from './ProfileAvatar'
import UserName from './UserName'

type ProfileProps = {
  address: string
}

const Profile = async ({ address }: ProfileProps) => {
  const userInfo = await getUserInfo(address)

  return (
    <div className='flex flex-col items-center'>
      <ProfileAvatar userInfo={userInfo} />

      <UserName targetAddress={address} userInfo={userInfo} />
      <Typography>{address}</Typography>
    </div>
  )
}

export const ProfileSkelton = () => (
  <div className='flex flex-col items-center'>
    <Skeleton className='h-40 w-40 rounded-full' />
    <Skeleton className='h-4 w-[210px]' />
    <Skeleton className='h-4 w-[210px]' />
  </div>
)

export default Profile
