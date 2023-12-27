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

export default Profile
