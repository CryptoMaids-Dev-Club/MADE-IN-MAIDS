import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { MarketItemInfo } from '@/app/market/types'
import { PurchaseForm } from '../PurchaseForm'

const ItemDetail = ({ marketItem }: { marketItem: MarketItemInfo }) => {
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'pink',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Box sx={style}>
      <Grid container justifyContent='center'>
        <Grid item md={6} sm={12}>
          <Image
            src={marketItem?.nsfw ? marketItem.external_url : marketItem.image}
            alt='nft'
            width='500'
            height={300}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Grid>
            <Typography variant='h4' component='span' sx={{ color: 'black' }}>
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
  )
}

export default ItemDetail
