import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { prisma } from '@/lib/prisma'
import ProfileAvatar from './ProfileAvatar'
import UserName from './UserName'

type ProfileProps = {
  address: string
}

const Profile = async ({ address }: ProfileProps) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      address: address.toLowerCase(),
    },
  })

  const defaultUserInfo = { id: 0, name: 'NO NAME', address: '0x...', iconUrl: '' }

  return (
    <Grid container alignItems='center' direction='column'>
      <ProfileAvatar userInfo={userInfo ?? defaultUserInfo} />

      <UserName targetAddress={address} userInfo={userInfo ?? defaultUserInfo} />
      <Typography>{address}</Typography>
    </Grid>
  )
}

export default Profile
