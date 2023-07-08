'use client'

import { Button, Container, Grid, Typography, useMediaQuery } from '@mui/material'
import { Image } from 'mui-image'

import NextLink from 'next/link'
import { useAssets } from '@/hooks/useAsset'
import { useTop5Votes } from './hooks/useVotes'

export const Top5 = () => {
  const matches = useMediaQuery('(min-width: 560px)')
  const { ids, amounts } = useTop5Votes(matches)

  const assets = useAssets(ids)
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

              <NextLink href={`/detail/${ids[index]}`}>
                <Button>
                  <Image src={asset.external_url} width='90%' height='auto' />
                </Button>
              </NextLink>

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
