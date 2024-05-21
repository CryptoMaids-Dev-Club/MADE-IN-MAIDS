import Image from 'next/image'
import { Trans } from 'react-i18next/TransWithoutContext'
import { FadeInBottom } from '@/app/[lang]/_components/Elements/FadeInButton'
import { getTranslation } from '@/app/i18n/server'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const HowToEntry = async ({ lang }: { lang: string }) => {
  const { t } = await getTranslation(lang)

  return (
    <FadeInBottom>
      <div className='grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='h-96 w-full border-2 border-gray-500 bg-gray-900'>
          <CardContent>
            <div className='max-h-48'>
              <Typography variant='h3' className='text-yellow-300'>
                {t('lottery:howToEntry1')}
              </Typography>
              <Typography variant='largeText' className='[&_span]:inline-block'>
                <Trans i18nKey='lottery:howToEntryDetail1' t={t} />
              </Typography>
            </div>
            <div className='my-2 grid max-h-48 grid-cols-2 justify-center'>
              <Image src='/images/medal.png' alt='medal' width={250} height={250} />
              <Image src='/images/ticket.png' alt='ticket' width={250} height={250} />
            </div>
          </CardContent>
        </Card>

        <Card className='h-96 w-full border-2 border-gray-500 bg-gray-900'>
          <CardContent>
            <div className='max-h-48'>
              <Typography variant='h3' className='text-yellow-300'>
                {t('lottery:howToEntry2')}
              </Typography>
              <Typography variant='largeText' className='[&_span]:inline-block'>
                <Trans i18nKey='lottery:howToEntryDetail2' t={t} />
              </Typography>
            </div>
            <div className='flex justify-center'>
              <Image src='/images/lotteryBox.png' alt='medal' width={300} height={300} />
            </div>
          </CardContent>
        </Card>

        <Card className='h-96 border-2 border-gray-500 bg-gray-900'>
          <CardContent>
            <div className='max-h-48'>
              <Typography variant='h3' className='text-yellow-300'>
                {t('lottery:howToEntry3')}
              </Typography>
              <Typography variant='largeText'>{t('lottery:howToEntryDetail3')}</Typography>
            </div>
            <div className='grid max-h-40 grid-cols-5'>
              <div className='col-span-3'>
                <Image src='/images/yuki.png' alt='medal' width={280} height={280} />
              </div>
              <div className='col-span-2 mt-10'>
                <Image src='/images/popper.png' alt='medal' width={200} height={200} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FadeInBottom>
  )
}

export default HowToEntry
