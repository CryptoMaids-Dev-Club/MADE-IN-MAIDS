'use client'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import { useUser } from '@/app/(features)/account/_hooks/useUser'
import UserName from './UserName'
import ProfileAvatar from './ProfileAvatar'

type ProfileProps = {
  address: string
}

const Profile = ({ address }: ProfileProps) => {
  const { userInfo, isLoading } = useUser(address)

  if (isLoading)
    return (
      <Grid container alignItems='center' direction='column'>
        <Skeleton variant='circular' width={150} height={150} sx={{ bgcolor: 'grey.900' }} />
        <Skeleton variant='text' width={210} height={50} sx={{ bgcolor: 'grey.900' }} />
        <Skeleton variant='text' width={210} sx={{ bgcolor: 'grey.900' }} />
      </Grid>
    )

  return (
    <Grid container alignItems='center' direction='column'>
      <ProfileAvatar userInfo={userInfo} />

      <UserName userInfo={userInfo} />
      <Typography sx={{ color: 'white' }}>{address}</Typography>
    </Grid>
  )
}

export default Profile
