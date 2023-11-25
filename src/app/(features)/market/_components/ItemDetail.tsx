import Image from 'next/image'
import { Typography } from '@/components/ui/Typography'
import { PurchaseForm } from './PurchaseForm'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

const ItemDetail = ({ marketItem }: { marketItem: MarketItemInfo }) => {
  // const style = {
  //   marginTop: '30px',
  //   maxWidth: 1200,
  //   boxShadow: 12,
  //   p: 4,
  // }

  return (
    <div className='container mx-auto max-w-[1200px]'>
      <div className='grid grid-rows-1 grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <Image
            src={marketItem?.nsfw ? marketItem.external_url : marketItem.image}
            alt='nft'
            width={600}
            height={600}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className='col-span-1'>
          <Typography variant='h2'>{marketItem.name}</Typography>
          <Typography variant='h6'>{marketItem.description}</Typography>
          <Typography variant='h6'>{`Supply: ${marketItem.supply}`}</Typography>
        </div>
      </div>
      <PurchaseForm item={marketItem} />
    </div>
  )
}

export default ItemDetail
