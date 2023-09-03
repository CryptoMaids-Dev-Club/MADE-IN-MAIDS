import Avatar from '@mui/material/Avatar'
import { User } from '@prisma/client'

type ProfileAvatarProps = {
  userInfo: User
}

const ProfileAvatar = ({ userInfo }: ProfileAvatarProps) => (
  <Avatar src={userInfo ? userInfo.iconUrl : ''} sx={{ width: 150, height: 150 }} />
)

export default ProfileAvatar
