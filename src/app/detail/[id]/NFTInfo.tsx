import { Grid, Link, Typography } from '@mui/material'
import type { AssetInfo } from '@/hooks/useAsset'
import Image from 'next/image'

type NFTInfoProps = AssetInfo & {
  id: number
}

export const NFTInfo = ({ id, name }: NFTInfoProps) => (
  <>
    <Grid item>
      <Typography component='span' sx={{ color: 'black', typography: { sm: 'h4', xs: 'h5' } }}>
        {name}
      </Typography>
    </Grid>
    <Grid item>
      <Link
        href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${id}`}
        underline='none'>
        <Image src='/images/Logomark-Blue.png' alt='logo' height='35' width='35' />
      </Link>
    </Grid>
  </>
)

export default NFTInfo
