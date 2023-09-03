import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import getUserInfo from '@/app/api/user/getUserInfo'
import UserName from './UserName'
import ProfileAvatar from './ProfileAvatar'

type ProfileProps = {
  address: string
}

const Profile = async ({ address }: ProfileProps) => {
  const userInfo = await getUserInfo({ address })

  return (
    <Grid container alignItems='center' direction='column'>
      <ProfileAvatar userInfo={userInfo} />

      <UserName targetAddress={address} userInfo={userInfo} />
      <Typography sx={{ color: 'white' }}>{address}</Typography>
    </Grid>
  )
}

export default Profile
