/* eslint-disable @next/next/no-img-element */
import { ImageListItem } from '@mui/material'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

const RecentlyUpdatedProfiles = async () => {
  const profiles = await prisma.maidProfile.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
  })
  const style = {
    '&:hover': {
      opacity: '0.5',
      transition: '0.3s',
    },
    img: {
      objectFit: 'cover',
      width: '100%',
      height: '600px',
    },
  }

  return (
    <>
      <Typography variant='h2'>Recently Updated Profiles</Typography>
      <Box sx={{ border: '2px solid white', padding: '5px' }}>
        <ImageList sx={{ height: 600 }} cols={5} gap={15}>
          {profiles.map((profile) => (
            <ImageListItem key={profile.imageUrl} sx={style}>
              <Link href={`/detail/${profile.id}`}>
                <img src={profile.imageUrl} srcSet={profile.imageUrl} alt={profile.name} loading='lazy' />
                <ImageListItemBar title={profile.name} />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  )
}

export default RecentlyUpdatedProfiles
