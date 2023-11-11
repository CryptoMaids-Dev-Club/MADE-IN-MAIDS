import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const PredictionListSkelton = () => (
  <Box sx={{ border: '3px dashed hotpink', borderRadius: '20px', padding: '10px' }}>
    <Grid container spacing={2} alignItems='center' justifyContent='center'>
      <Grid item>
        <Skeleton width={350} height={150} />
      </Grid>
      <Grid item>
        <Skeleton width={350} height={150} />
      </Grid>
      <Grid item>
        <Skeleton width={350} height={150} />
      </Grid>
    </Grid>
  </Box>
)

export default PredictionListSkelton
