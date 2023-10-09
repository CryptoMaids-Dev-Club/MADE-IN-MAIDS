import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import getAsset from '@/app/api/asset/[id]/getAsset'

type NFTInfoProps = {
  id: number
}

export const NFTInfo = async ({ id }: NFTInfoProps) => {
  const asset = await getAsset({ id })

  return (
    <>
      <Grid item>
        <Typography component='span' sx={{ typography: { sm: 'h4', xs: 'h5' } }}>
          {asset.name}
        </Typography>
      </Grid>
      <Grid item mt='5px'>
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
