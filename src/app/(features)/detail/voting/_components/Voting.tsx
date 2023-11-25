import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'
import getAsset from '@/app/api/asset/[id]/getAsset'
import { NFTImage } from '../../_components/NFTImage'
import { NFTInfo } from '../../_components/NFTInfo'
import { Induction } from './Induction'
import { VotingInfo } from './VotingInfo'

const VotingForm = dynamic(() => import('./VotingForm'), { ssr: false })

type VotingProps = {
  id: number
}

const Voting = ({ id }: VotingProps) => {
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
            <Stack spacing={2} divider={<Divider />}>
              <Suspense fallback={<Skeleton />}>
                <NFTInfo id={id} />
              </Suspense>

              <VotingInfo id={Number(id)} />

              <VotingForm id={Number(id)} />

              <Induction />
            </Stack>
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
