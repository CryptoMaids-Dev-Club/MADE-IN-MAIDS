import { User } from '@prisma/client'
import { UserRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileAvatarProps = {
  userInfo: User
}

const ProfileAvatar = ({ userInfo }: ProfileAvatarProps) => (
  <Avatar className='h-40 w-40'>
    <AvatarImage src={userInfo ? userInfo.iconUrl : ''} />
    <AvatarFallback>
      <UserRound size={100} />
    </AvatarFallback>
  </Avatar>
)

export default ProfileAvatar
