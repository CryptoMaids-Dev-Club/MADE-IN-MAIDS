import { Suspense } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import MaidsProfileWrapper from './MaidsProfileWrapper'
import { NFTImage } from './NFTImage'

type DetailProps = {
  id: number
}

const Detail = ({ id }: DetailProps) => {
  const style = {
    width: '100%',
    boxShadow: 12,
    p: 4,
  }

  return (
    <Container>
      <Box sx={style} mt='50px'>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item md={6} xs={12}>
            <Suspense fallback={<Skeleton animation='wave' variant='rectangular' width={500} height={800} />}>
              <NFTImage id={id} />
            </Suspense>
          </Grid>
          <Grid item md={6} xs={12}>
            <Suspense fallback={<Skeleton />}>
              <MaidsProfileWrapper id={id} />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Detail
