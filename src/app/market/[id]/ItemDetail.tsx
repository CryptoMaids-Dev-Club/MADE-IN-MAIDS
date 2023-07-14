'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useItems } from '@/app/market/hooks/useItems'
import { useMetadata } from '@/app/market/hooks/useMetadata'
import Image from 'next/image'
import { ItemInfo } from '../types'
import { PurchaseForm } from '../PurchaseForm'

const ItemDetail = ({ id }: { id: string }) => {
  const matches = useMediaQuery('(min-width: 560px)')
  const items = useItems()
  const marketItem = useMetadata(items as ItemInfo[])[Number(id)]

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? 1200 : window.innerWidth - 30,
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
            width={matches ? '500' : window.innerWidth - 200}
            height={300}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Grid>
            <Typography variant={matches ? 'h4' : 'h5'} component='span' sx={{ color: 'black' }}>
              {marketItem.name}
            </Typography>
          </Grid>
          <Grid sx={{ overflow: 'auto', maxHeight: matches ? 300 : 100 }}>
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
