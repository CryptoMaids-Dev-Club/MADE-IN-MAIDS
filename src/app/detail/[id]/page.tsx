'use client'

import { Box, Container, Divider, Grid } from '@mui/material'
import { Address, useAccount } from 'wagmi'
import { useAsset } from '@/hooks/useAsset'
import { Footer } from '@/app/_components/Footer'
import { VotingForm } from './VotingForm'
import { VotingInfo } from './VotingInfo'
import { NFTInfo } from './NFTInfo'
import { Induction } from './Induction'
import { NFTImage } from './NFTImage'

const Detail = ({ params }: { params: { id: string } }) => {
  const { address } = useAccount()
  const assetQuery = useAsset([Number(params.id)])

  if (!assetQuery.data) return null

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
              <NFTImage url={assetQuery.data[0].external_url} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={1}>
                <NFTInfo id={Number(params.id)} {...assetQuery.data[0]} />
                <Grid item md={12} xs={12}>
                  <Divider />
                  <br />
                </Grid>
                <VotingInfo address={address as Address} id={Number(params.id)} />
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

export default Detail
