'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { Address, useAccount } from 'wagmi'
import { useAssets } from '@/hooks/useAsset'
import { Footer } from '@/app/_components/Footer'
import { VotingForm } from './VotingForm'
import { VotingInfo } from './VotingInfo'
import { NFTInfo } from './NFTInfo'
import { Induction } from './Induction'
import { NFTImage } from './NFTImage'

const Detail = ({ params }: { params: { id: string } }) => {
  const { address } = useAccount()
  const assets = useAssets([Number(params.id)])

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
              <NFTImage url={assets[0].external_url} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={1}>
                <NFTInfo id={Number(params.id)} {...assets[0]} />
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
