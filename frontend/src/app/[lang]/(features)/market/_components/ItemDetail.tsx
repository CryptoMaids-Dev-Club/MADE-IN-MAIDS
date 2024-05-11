import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import { getMarketItems } from '@/app/[lang]/(features)/market/_api/query'
import { Typography } from '@/components/ui/typography'
import { PurchaseForm } from './PurchaseForm'
import type { MarketItemInfo } from '@/app/[lang]/(features)/market/_types'

type ItemDetailProps = {
  id: number
}

const ItemDetail = async ({ id }: ItemDetailProps) => {
  noStore()
  const marketItems = await getMarketItems()
  const marketItem = marketItems[id] as MarketItemInfo

  return (
    <div className='container mx-auto mt-4 max-w-[1200px] pb-12'>
      <div className='grid grid-cols-1  gap-4 md:grid-cols-2'>
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
            className={`${marketItem?.nsfw && `blur-md`}`}
          />
        </div>
        <div className='col-span-1'>
          <Typography variant='h2'>{marketItem.name}</Typography>
          <Typography variant='h6'>{marketItem.description}</Typography>
          <Typography variant='h6'>{`Supply: ${marketItem.supply}`}</Typography>
          <Typography variant='h6'>{`Limit Per Wallet: ${marketItem.limitPerWallet}`}</Typography>
        </div>
      </div>
      <PurchaseForm item={marketItem} />
    </div>
  )
}

export default ItemDetail
