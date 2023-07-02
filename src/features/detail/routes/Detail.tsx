import { Box, Button, Container, Divider, Grid, useMediaQuery } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { Address, useAccount } from 'wagmi'
import { useAsset } from '@/hooks/useAsset'
import { Footer } from '@/app/components/Footer'
import { VotingForm } from '../components/VotingForm'
import { VotingInfo } from '../components/VotingInfo'
import { NFTInfo } from '../components/NFTInfo'
import { Induction } from '../components/Induction'
import { NFTImage } from '../components/NFTImage'

const Detail = () => {
  const matches = useMediaQuery('(min-width: 560px)')
  const navigate = useNavigate()
  const { id } = useParams()
  const { address } = useAccount()
  const assetQuery = useAsset([Number(id)])

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
                <NFTInfo id={Number(id)} {...assetQuery.data[0]} />
                <Grid item md={12} xs={12}>
                  <Divider />
                  <br />
                </Grid>
                <VotingInfo address={address as Address} id={Number(id)} />
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
            {!matches && (
              <>
                <br />
                <Divider />
                <Grid item xs={12}>
                  <Button
                    onClick={() => navigate(-1)}
                    fullWidth
                    sx={{ fontSize: '20px', border: '1px solid', mt: '30px' }}>
                    Back
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default Detail
