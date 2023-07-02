import { Button, Container, Grid, Typography, useMediaQuery } from '@mui/material'
import { Image } from 'mui-image'

import { Link } from 'react-router-dom'
import first from '@/assets/images/1.png'
import second from '@/assets/images/2.png'
import third from '@/assets/images/3.png'
import fourth from '@/assets/images/4.png'
import fifth from '@/assets/images/5.png'
import { useAsset } from '@/hooks/useAsset'
import { useTop5Votes } from '../hooks/useVotes'

export const Top5 = () => {
  const matches = useMediaQuery('(min-width: 560px)')
  const { ids, amounts } = useTop5Votes(matches)

  const { data } = useAsset(ids)
  const displayOrder = matches ? [second, first, third, fourth, fifth] : [first, second, third, fourth, fifth]

  return (
    <Container>
      <Grid container justifyContent='center' alignContent='center' mt='20px' mb='10px'>
        {matches ? (
          <Typography variant='h1' color='hotpink'>
            CryptoMaids VOTING
          </Typography>
        ) : (
          <>
            <Typography variant='h2' color='hotpink'>
              CryptoMaids
            </Typography>
            <Typography variant='h2' color='hotpink'>
              VOTING
            </Typography>
          </>
        )}
      </Grid>

      <Grid container justifyContent='center' alignContent='center'>
        {data?.map((asset, index) => (
          <Grid key={asset.name} item md={4} xs={12}>
            <Grid container justifyContent='center' alignContent='center'>
              <img src={displayOrder[index]} alt='rank' height={matches ? '300px' : '100px'} />

              <Link to={`/voting/detail/${ids[index]}`}>
                <Button>
                  <Image src={asset.external_url} width='90%' height='auto' />
                </Button>
              </Link>

              <Typography variant='h5' color='gold'>
                {`Number of Votes:${amounts[index]}`}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Top5
