import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { TwitterIcon, TwitterShareButton } from 'react-share'

export const TwitterAlert = ({
  message,
  title,
  url,
  hashtags,
}: {
  message: string
  title?: string
  url: string
  hashtags?: string[]
}) => (
  <Grid container>
    <Grid item>
      <Typography variant='h5'>{message}</Typography>
    </Grid>
    <Grid item>
      <TwitterShareButton title={title} url={url} hashtags={hashtags}>
        <TwitterIcon size={34} round />
      </TwitterShareButton>
    </Grid>
  </Grid>
)

export default TwitterAlert
