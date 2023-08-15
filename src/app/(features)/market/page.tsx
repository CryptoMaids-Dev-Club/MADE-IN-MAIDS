import { Header } from '@/app/_components/Header'
import { Metadata } from 'next'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import ItemList from './ItemList'

// eslint-disable-next-line react/function-component-definition
export default function Market() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Grid container justifyContent='center' alignContent='center' mt='20px'>
            <CircularProgress />
          </Grid>
        }>
        <ItemList />
      </Suspense>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Market',
}
