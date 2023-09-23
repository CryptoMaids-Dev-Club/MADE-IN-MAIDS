import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { PurchaseForm } from './PurchaseForm'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

const ItemDetail = ({ marketItem }: { marketItem: MarketItemInfo }) => {
  const style = {
    marginTop: '30px',
    maxWidth: 1200,
    bgcolor: 'pink',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Container>
      <Box sx={style}>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item md={6} sm={12}>
            <Image
              src={marketItem?.nsfw ? marketItem.external_url : marketItem.image}
              alt='nft'
              width={600}
              height={600}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Grid>
          <Grid item md={6}>
            <Grid>
              <Typography component='span' sx={{ color: 'black', typography: { sm: 'h4', xs: 'h5' } }}>
                {marketItem.name}
              </Typography>
            </Grid>
            <Grid sx={{ overflow: 'auto', maxHeight: 300 }}>
              <Typography variant='h6' component='span' sx={{ color: 'black' }}>
                {marketItem.description}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant='h6' component='span' sx={{ color: 'black' }}>
                {`Supply: ${marketItem.supply}`}
              </Typography>
            </Grid>
          </Grid>
          <PurchaseForm item={marketItem} />
        </Grid>
      </Box>
    </Container>
  )
}

export default ItemDetail
