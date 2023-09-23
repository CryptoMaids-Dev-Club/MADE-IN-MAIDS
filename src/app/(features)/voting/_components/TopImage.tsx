'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import NextLink from 'next/link'

import type { TopAsset } from '@/app/api/voting/[slug]/voting'

type TopImageProps = {
  topAssets: TopAsset[]
}

export const TopImage = ({ topAssets }: TopImageProps) => {
  topAssets.sort((a, b) => a.rank - b.rank)

  const sortedTopAssets = [...topAssets]
  const matches = useMediaQuery('(min-width: 560px)')
  if (matches) {
    ;[sortedTopAssets[1], sortedTopAssets[0]] = [topAssets[0], topAssets[1]]
  }

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

  return (
    <Grid container justifyContent='center' alignContent='center'>
      {sortedTopAssets.map((asset) => (
        <Grid key={asset.id} item md={4} xs={12}>
          <Grid container justifyContent='center' alignContent='center'>
            <Image src={`/images/${asset.rank}.png`} alt='rank' height='360' width='370' />
            <NextLink href={`/detail/${asset.id}`}>
              <Box overflow='hidden' width={340} height={576}>
                <Box sx={{ ...ImageStyle }}>
                  <Image src={asset.external_url} width='340' height='576' alt='maids' style={{ objectFit: 'cover' }} />
                </Box>
              </Box>
            </NextLink>
            <Typography variant='h5' color='gold'>
              {`Number of Votes:${asset.amount}`}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default TopImage
