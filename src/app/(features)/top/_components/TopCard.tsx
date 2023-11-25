import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'

type TopCardProps = {
  title: string
  color: string
  image: string
  description: string
  link: string
}

const TopCard = ({ title, color, image, description, link }: TopCardProps) => (
  <div className='container mx-auto'>
    <Typography variant='h1' className={`${color}`}>
      {title}
    </Typography>
    <Link href={link}>
      <div className='relative overflow-hidden bg-cover bg-no-repeat'>
        <Card className='w-[500px] h-[500px] transition duration-300 hover:scale-110'>
          <Image
            src={image}
            height={500}
            width={500}
            alt='item'
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
        </Card>
      </div>
      <Typography variant='h5'>{description}</Typography>
    </Link>
  </div>
)

export default TopCard

// <Grid container alignItems='center' direction='column'>
//   <Typography variant='h1' color={color}>
//     {title}
//   </Typography>
//   <Link href={link}>
//     <Card sx={{ width: { xs: 400, sm: 500 }, height: { xs: 530, sm: 580 } }}>
//       <Box overflow='hidden' sx={{ width: { xs: 400, sm: 500 }, height: { xs: 400, sm: 500 } }}>
//         <CardMedia sx={{ ...ImageStyle }}>
//           <Image
//             src={image}
//             height={500}
//             width={500}
//             alt='item'
//             style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
//           />
//         </CardMedia>
//       </Box>
//       <CardContent>
//         <Grid>
//           <Typography variant='h5' noWrap sx={{ color: 'yellow' }} style={{ whiteSpace: 'pre-line' }}>
//             {description}
//           </Typography>
//         </Grid>
//       </CardContent>
//     </Card>
//   </Link>
// </Grid>
