import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { Footer } from '@/app/_components/Footer'
import dynamic from 'next/dynamic'
import getAsset from '@/app/api/asset/[id]/getAsset'
import { VotingInfo } from './VotingInfo'
import { NFTInfo } from './NFTInfo'
import { Induction } from './Induction'

const VotingForm = dynamic(() => import('./VotingForm'), { ssr: false })
const NFTImage = dynamic(() => import('./NFTImage'), { ssr: false })

export default async function Page({ params }: { params: { id: string } }) {
  const asset = await getAsset({ id: params.id })

  const style = {
    width: '100%',
    bgcolor: 'pink',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Container>
        <Box sx={style} mt='50px'>
          <Grid container justifyContent='center' spacing={2}>
            <Grid item md={6} xs={12}>
              <NFTImage url={asset.external_url} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={1}>
                <NFTInfo id={Number(params.id)} {...asset} />
                <Grid item md={12} xs={12}>
                  <Divider />
                  <br />
                </Grid>
                <VotingInfo id={Number(params.id)} />
                <Grid item md={12} xs={12}>
                  <br />
                  <Divider />
                  <br />
                </Grid>
                <VotingForm id={Number(params.id)} />
                <Grid item md={12} xs={12}>
                  <br />
                </Grid>
                <Induction />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
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
