'use client'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Image } from 'mui-image'

import NextLink from 'next/link'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'
import type { Vote } from '@/app/api/voting/[slug]/voting'

type Top5Props = {
  votes: Vote[]
  assets: AssetInfo[]
}

export const Top5 = ({ votes, assets }: Top5Props) => {
  const matches = useMediaQuery('(min-width: 560px)')
  const displayOrder = matches ? [2, 1, 3, 4, 5] : [1, 2, 3, 4, 5]

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
        {assets.map((asset, index) => (
          <Grid key={asset.name} item md={4} xs={12}>
            <Grid container justifyContent='center' alignContent='center'>
              <Image src={`/images/${displayOrder[index]}.png`} alt='rank' height={matches ? '340px' : '100px'} />

              <NextLink href={`/detail/${votes[index].id}`}>
                <Button>
                  <Image src={asset.external_url} width='90%' height='auto' />
                </Button>
              </NextLink>

              <Typography variant='h5' color='gold'>
                {`Number of Votes:${votes[index].amount}`}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Top5
