import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import dynamic from 'next/dynamic'
import getAsset from '@/app/api/asset/[id]/getAsset'
import { Skeleton } from '@mui/material'
import { Suspense } from 'react'
import { VotingInfo } from './VotingInfo'
import { NFTInfo } from '../../_components/NFTInfo'
import { Induction } from './Induction'
import { NFTImage } from '../../_components/NFTImage'

const VotingForm = dynamic(() => import('./VotingForm'), { ssr: false })

type VotingProps = {
  id: number
}

const Voting = ({ id }: VotingProps) => {
  const style = {
    width: '100%',
    bgcolor: 'pink',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Container>
      <Box sx={style} mt='50px'>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item md={6} xs={12}>
            <Suspense
              fallback={
                <Skeleton
                  sx={{ bgcolor: 'grey.900' }}
                  animation='wave'
                  variant='rectangular'
                  width={500}
                  height={800}
                />
              }>
              <NFTImage id={id} />
            </Suspense>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={1}>
              <Suspense fallback={<Skeleton sx={{ bgcolor: 'grey.900' }} />}>
                <NFTInfo id={id} />
              </Suspense>
              <Grid item md={12} xs={12}>
                <Divider />
                <br />
              </Grid>

              <VotingInfo id={Number(id)} />

              <Grid item md={12} xs={12}>
                <br />
                <Divider />
                <br />
              </Grid>
              <VotingForm id={Number(id)} />
              <Grid item md={12} xs={12}>
                <br />
              </Grid>
              <Induction />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Voting

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
  const meta = await getAsset({ id: params.id })

  return {
    title: 'Detail',
    openGraph: {
      title: meta.name,
      siteName: 'CryptoMaids Made in Maids',
      images: [
        {
          url: meta.image,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.name,
      creator: '@CryptoMaids',
      images: [meta.image],
    },
  }
}
