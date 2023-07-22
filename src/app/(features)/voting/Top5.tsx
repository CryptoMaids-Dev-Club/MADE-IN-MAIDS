'use client'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
// import { Image } from 'mui-image'
import Image from 'next/image'

import NextLink from 'next/link'
import { Box } from '@mui/material'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'
import type { Vote } from '@/app/api/voting/[slug]/voting'

const ImageStyle = {
  '&:hover': {
    transform: 'scale(1.1,1.1)',
    transition: '0.5s all',
  },
  '&:focus': {
    transform: 'scale(1.1,1.1)',
    margin: 'auto 0',
    transition: '0.5s all',
  },
}

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
              <Image
                src={`/images/${displayOrder[index]}.png`}
                alt='rank'
                height={matches ? '340' : '100'}
                width={matches ? '370' : '120'}
              />

              <NextLink href={`/detail/${votes[index].id}`}>
                <Box overflow='hidden' width={340} height={576}>
                  <Box sx={{ ...ImageStyle }}>
                    <Image
                      src={asset.external_url}
                      width='340'
                      height='576'
                      alt='maids'
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </Box>
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
