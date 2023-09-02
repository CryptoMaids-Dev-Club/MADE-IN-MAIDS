import { Metadata } from 'next'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import ItemList from './ItemList'

const Market = () => (
  <Suspense
    fallback={
      <Grid container justifyContent='center' alignContent='center' mt='20px'>
        <CircularProgress />
      </Grid>
    }>
    <ItemList />
  </Suspense>
)

export default Market

export const metadata: Metadata = {
  title: 'Market',
}
