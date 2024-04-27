import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type PrizeCardProps = {
  image: string
  description: string
}

const PrizeCard = ({ image, description }: PrizeCardProps) => (
  <div>
    <div className='animate-fade-in '>
      <Card>
        <Image src={image} height={220} width={220} alt='item' />
      </Card>
    </div>
    <Typography variant='h4' className='text-center text-yellow-500'>
      {description}
    </Typography>
  </div>
)

export default PrizeCard
