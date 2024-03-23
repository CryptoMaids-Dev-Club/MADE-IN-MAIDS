import Image from 'next/image'
import { FadeInBottom } from '@/app/[lang]/_components/Elements/FadeInButton'
import { Typography } from '@/components/ui/typography'

const HowToGetMedal = () => {
  return (
    <div className='pb-20'>
      <div className='my-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-5'>
        <FadeInBottom>
          <div className='col-span-3 grid grid-cols-3 gap-4'>
            <Image className='col-span-2' src='/images/cluster.png' alt='medal' width={500} height={500} />
            <Image className='col-start-2 col-end-4' src='/images/minecraft.png' alt='medal' width={500} height={500} />
          </div>
          <div className='col-span-2'>
            <Typography variant='h2'>イベント参加！</Typography>
            <Typography variant='lead'>ClusterやMineCraft, ゲームイベントに参加しよう</Typography>
          </div>
        </FadeInBottom>
      </div>

      <div className='my-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2'>
        <FadeInBottom>
          <div>
            <Typography variant='h2'>ファンアート！</Typography>
            <Typography variant='lead'>CryptoMaidsのファンアートを描こう</Typography>
          </div>

          <Image src='/images/fanart.png' alt='medal' width={600} height={600} />
        </FadeInBottom>
      </div>

      <div className='mt-8'>
        <FadeInBottom>
          <Typography variant='h2' className='text-center'>
            部活動
          </Typography>
          <Typography variant='lead' className='text-center'>
            ホルダー限定の様々な部活動に参加しよう
          </Typography>

          <div className='mt-4 grid grid-cols-2'>
            <div>
              <Image src='/images/club.png' alt='medal' width={800} height={800} />
            </div>

            <div className='mx-4'>
              <Typography variant='h3' className='mt-4'>
                部活動一覧
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
