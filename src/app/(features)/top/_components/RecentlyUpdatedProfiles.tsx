import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { ImageListItemWithStyle } from '@/app/_components/Elements/ImageListItemWithStyle'
import { getRecentlyUpdateProfiles } from '@/app/api/maidsProfile/getRecentlyUpdateProfiles'

const RecentlyUpdatedProfiles = async () => {
  const profiles = await getRecentlyUpdateProfiles()

  return (
    <>
      <Typography variant='h2'>Recently Updated Profiles</Typography>
      <Box sx={{ border: '2px solid white', padding: '5px' }}>
        <ImageList sx={{ height: 600 }} cols={5} gap={15}>
          {profiles.map((profile) => (
            <ImageListItemWithStyle key={profile.imageUrl}>
              <Link href={`/detail/${profile.id}`}>
                <img src={profile.imageUrl} srcSet={profile.imageUrl} alt={profile.name} loading='lazy' />

                <ImageListItemBar title={profile.name} />
              </Link>
            </ImageListItemWithStyle>
          ))}
        </ImageList>
      </Box>
    </>
  )
}

export default RecentlyUpdatedProfiles
