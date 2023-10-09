import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const ProfileSkelton = () => (
  <Grid container alignItems='center' direction='column'>
    <Skeleton variant='circular' width={150} height={150} />
    <Skeleton variant='text' width={210} height={50} />
    <Skeleton variant='text' width={210} />
  </Grid>
)

export default ProfileSkelton
