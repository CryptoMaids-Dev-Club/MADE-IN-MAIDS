import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import getUserInfo from '@/app/api/user/getUserInfo'
import ProfileAvatar from './ProfileAvatar'
import UserName from './UserName'

type ProfileProps = {
  address: string
}

const Profile = async ({ address }: ProfileProps) => {
  const userInfo = await getUserInfo({ address })

  return (
    <Grid container alignItems='center' direction='column'>
      <ProfileAvatar userInfo={userInfo} />

      <UserName targetAddress={address} userInfo={userInfo} />
      <Typography>{address}</Typography>
    </Grid>
  )
}

export default Profile
