import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type TopCardProps = {
  title: string
  color: string
  image: string
  description: string
  link: string
}

const TopCard = ({ title, color, image, description, link }: TopCardProps) => (
  <Link href={link}>
    <Typography variant='h1' className={`${color} text-center`}>
      {title}
    </Typography>
    <div className='relative overflow-hidden bg-cover bg-no-repeat'>
      <Card className='transition duration-300 hover:scale-110'>
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
)

export default TopCard
