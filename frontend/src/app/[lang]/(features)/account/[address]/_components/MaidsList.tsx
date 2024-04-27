'use client'

import Image from 'next/image'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import { useAccount } from 'wagmi'
import { useMaidsList } from '@/app/[lang]/(features)/account/[address]/_hooks/useMaidsList'
import { useSaveUserInfo } from '@/app/[lang]/(features)/account/[address]/_hooks/useSaveUserInfo'
import { useLanguage } from '@/app/i18n/client'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import type { Address } from 'viem'

type MaidsListProps = {
  targetAddress: Address
}

const MaidsList = ({ targetAddress }: MaidsListProps) => {
  const { language } = useLanguage()

  const { maidsList, hasMore, loadMore } = useMaidsList(targetAddress)
  const { address } = useAccount()
  const { saveUserInfo } = useSaveUserInfo(address ?? '0x0')

  if (targetAddress === undefined) return <Typography>Invalid Address</Typography>

  const handleSaveClick = async (newIconUrl: string) => {
    await saveUserInfo('', newIconUrl)
  }

  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={<Typography key={0}>Loading...</Typography>}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {maidsList.map((nft) => (
          <div key={nft.image}>
            <Link href={`/${language}/detail/${nft.token_id}`}>
              <div className='relative overflow-hidden bg-cover bg-no-repeat'>
                <Image
                  className='transition duration-300 hover:scale-110'
                  height={600}
                  width={600}
                  src={nft.image}
                  alt={nft.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </Link>
            <div className='flex w-full flex-row bg-gray-800 px-4 py-2'>
              <Typography variant='h4' className='truncate'>
                {nft.name}
              </Typography>
              {address && address.toLowerCase() === nft.owner && (
                <Badge className='ml-4 cursor-pointer' onClick={() => handleSaveClick(nft.image)}>
                  Set as Icon
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default MaidsList
