import { FadeInBottom } from '@/app/[lang]/_components/Elements/FadeInButton'
import { getTranslation } from '@/app/i18n/server'
import { Typography } from '@/components/ui/typography'
import Image from 'next/image'
import { Trans } from 'react-i18next/TransWithoutContext'

const HowToGetMedal = async ({ lang }: { lang: string }) => {
  const { t } = await getTranslation(lang)

  return (
    <div className='pb-4'>
      <div className='my-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-5'>
        <FadeInBottom>
          <div className='col-span-3 grid grid-cols-3 gap-4'>
            {/* Apply order classes for mobile view */}
            <div className='order-2 col-span-3 md:order-none md:col-span-2'>
              <Image src='/images/lottery/cluster.png' alt='medal' width={500} height={500} />
            </div>
            <div className='order-3 col-span-3 md:order-none md:col-start-2 md:col-end-4'>
              <Image src='/images/lottery/minecraft.png' alt='medal' width={500} height={500} />
            </div>
          </div>
          {/* Adjust the order to display this block first on mobile */}
          <div className='order-first col-span-3 md:order-none md:col-span-2'>
            <Typography variant='h2'>{t('lottery:howToGetMedalEvent')}</Typography>
            <Typography variant='lead' className='[&_span]:inline-block'>
              <Trans i18nKey='lottery:howToGetMedalEventText' t={t} />
            </Typography>
          </div>
        </FadeInBottom>
      </div>

      <div className='my-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2'>
        <FadeInBottom>
          <div>
            <Typography variant='h2'>{t('lottery:howToGetMedalFanart')}</Typography>
            <Typography variant='lead'>{t('lottery:howToGetMedalFanartText')}</Typography>
          </div>

          <Image src='/images/lottery/fanart.png' alt='medal' width={600} height={600} />
        </FadeInBottom>
      </div>

      <div className='mt-8'>
        <FadeInBottom>
          <Typography variant='h2' className='text-center'>
            {t('lottery:howToGetMedalClub')}
          </Typography>
          <Typography variant='lead' className='text-center [&_span]:inline-block'>
            <Trans i18nKey='lottery:howToGetMedalClubText' t={t} />
          </Typography>

          <div className='mt-4 grid grid-cols-1 items-center md:grid-cols-2'>
            <div>
              <Image src='/images/lottery/club.png' alt='medal' width={800} height={800} />
            </div>

            <div className='mx-4'>
              <Typography variant='h3' className='mt-4'>
                {t('lottery:clubList')}
              </Typography>
              <ul className='space-y-2'>
                <li>
                  <Typography variant='p' className='text-yellow-300'>
                    💰トレード部
                  </Typography>
                  仮想通貨、株式、為替の話題で盛り上がろう
                </li>
                <li>
                  <Typography variant='p' className='text-yellow-300'>
                    💻開発部
                  </Typography>
                  技術情報の共有・ファンサイトの開発
                </li>
                <li>
                  <Typography variant='p' className='text-yellow-300'>
                    💋nfgirlプロデュース部
                  </Typography>
                  コミュニティ発祥ユニット、ノンファンジブルガールのプロデュース
                </li>
                <li>
                  <Typography variant='p' className='text-yellow-300'>
                    🖨️画像生成AI部
                  </Typography>
                  生成AIの情報共有や作品の公開
                </li>
                <li>
                  <Typography variant='p' className='text-yellow-300'>
                    🍚ダイエット部
                  </Typography>
                  一緒に励まし合ってダイエット頑張りましょう！
                </li>
                <li>
                  <Typography variant='p' className='text-yellow-300'>
                    📈chart-cafe
                  </Typography>
                  Will Answer questions from community on charting, technical analyses, anything and all things Charting
                </li>
              </ul>
            </div>
          </div>
        </FadeInBottom>
      </div>
    </div>
  )
}

export default HowToGetMedal
