import { Button, Grid, Link, Typography, useMediaQuery } from '@mui/material'
import oslogo from '@/assets/images/Logomark-Blue.png'
import { AssetInfo } from '@/hooks/useAsset'
import { useNavigate } from 'react-router-dom'

type NFTInfoProps = AssetInfo & {
  id: number
}

export const NFTInfo = ({ id, name }: NFTInfoProps) => {
  const matches = useMediaQuery('(min-width: 560px)')
  const navigate = useNavigate()

  return (
    <>
      {matches && (
        <Grid>
          <Button onClick={() => navigate(-1)} sx={{ fontSize: '20px', border: '1px solid', mt: '5px', ml: '460px' }}>
            Back
          </Button>
        </Grid>
      )}

      <Grid item>
        <Typography variant={matches ? 'h4' : 'h5'} component='span' sx={{ color: 'black' }}>
          {name}
        </Typography>
      </Grid>
      <Grid item mt={matches ? '5px' : '0px'}>
        <Link
          href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${id}`}
          underline='none'>
          <img src={oslogo} alt='logo' height='35px' />
        </Link>
      </Grid>
    </>
  )
}

export default NFTInfo
