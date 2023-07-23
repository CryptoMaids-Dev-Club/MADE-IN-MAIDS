import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

type TopCardProps = {
  title: string
  color: string
  image: string
  description: string
  link: string
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

const TopCard = ({ title, color, image, description, link }: TopCardProps) => (
  <Grid container alignItems='center' direction='column'>
    <Typography variant='h1' color={color}>
      {title}
    </Typography>
    <Link href={link}>
      <Card sx={{ width: { xs: 400, sm: 500 }, height: { xs: 530, sm: 580 }, background: 'black' }}>
        <Box overflow='hidden' sx={{ width: { xs: 400, sm: 500 }, height: { xs: 400, sm: 500 } }}>
          <CardMedia sx={{ ...ImageStyle }}>
            <Image
              src={image}
              height={500}
              width={500}
              alt='item'
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </CardMedia>
        </Box>
        <CardContent sx={{ background: 'black' }}>
          <Grid>
            <Typography variant='h5' noWrap sx={{ color: 'yellow' }} style={{ whiteSpace: 'pre-line' }}>
              {description}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  </Grid>
)

export default TopCard
