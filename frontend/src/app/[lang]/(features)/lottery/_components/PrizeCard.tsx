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
        <Image src={image} height={500} width={500} alt='item' />
      </Card>
    </div>
    <Typography variant='h4' className='max-w-[500px] text-center text-yellow-500'>
      {description}
    </Typography>
  </div>
)

export default PrizeCard
