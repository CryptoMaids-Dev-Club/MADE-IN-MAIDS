'use client'

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

type NFTInfoProps = AssetInfo & {
  id: number
}

export const NFTInfo = ({ id, name }: NFTInfoProps) => {
  const matches = useMediaQuery('(min-width: 560px)')

  return (
    <>
      <Grid item>
        <Typography component='span' sx={{ color: 'black', typography: { sm: 'h4', xs: 'h5' } }}>
          {name}
        </Typography>
      </Grid>
      <Grid item mt={matches ? '5px' : '0px'}>
        <Link
          href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${id}`}
          underline='none'>
          <Image src='/images/Logomark-Blue.png' alt='logo' height='35' width='35' />
        </Link>
      </Grid>
    </>
  )
}

export default NFTInfo
