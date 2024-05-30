import { unstable_noStore as noStore } from 'next/cache'
import { getLotteryInfo } from '@/app/[lang]/(features)/lottery/_api/query'
import EntryForm from '@/app/[lang]/(features)/lottery/_components/EntryForm'
import PrizeCard from '@/app/[lang]/(features)/lottery/_components/PrizeCard'
import UserInfo from '@/app/[lang]/(features)/lottery/_components/UserInfo'
import { getTranslation } from '@/app/i18n/server'
import { Divider } from '@/components/ui/divider'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { unixToDate } from '@/utils/date'

type LotteryInformationProps = {
  lang: string
  lotteryId?: number
}

const LotteryInformation = async ({ lang, lotteryId }: LotteryInformationProps) => {
  noStore()
  const lotteryInfos = await getLotteryInfo()
  const lotteryInfo = lotteryInfos[lotteryId ?? lotteryInfos.length - 1]
  const { jstTime, utcTime } = unixToDate(lotteryInfo.endTime)
  const { t } = await getTranslation(lang)

  const winners = [
    '0xF15f58195A4F646C66363eA8bFc30BbBa450DE1A',
    '0x1a78Ce6Ad347e4ae2DfC03FAfF6981a2E82a4200',
    '0xE78AB91f0e7FD82d35e5e250Da2924363F205233',
    '0xde38c6964f840afeEB6D891cb4F6B132498579AE',
    '0xE78AB91f0e7FD82d35e5e250Da2924363F205233',
  ]

  return (
    <>
      <Typography variant='h2' className='my-2  text-pink-500'>
        Lottery Info
      </Typography>
      <Typography variant='largeText'>
        {t('lottery:endTime')}: {lang === 'en' ? utcTime : jstTime}
      </Typography>
      <Typography variant='largeText'>
        {t('lottery:currentEntries')}: {lotteryInfo.totalShares}
      </Typography>

      <Typography variant='h2' className='my-2 text-yellow-400'>
        Prizes
      </Typography>
      <div className='grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-5'>
        {lotteryInfo.prizes.map((prize, index) => (
          <PrizeCard key={index} image={prize.prizeImageUrl} description={prize.prizeName} />
        ))}
      </div>
      <Typography variant='h2' className=' text-yellow-400'>
        Winners
      </Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prize</TableHead>
            <TableHead>Winner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {winners.map((winner, index) => (
            <TableRow key={index}>
              <TableCell className='text-lg'>{lotteryInfo.prizes[index].prizeName}</TableCell>
              <TableCell className='text-lg'>{winner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider className='my-2' />
      <UserInfo lotteryId={lotteryId ?? lotteryInfos.length - 1} />
      <EntryForm lotteryId={lotteryId ?? lotteryInfos.length - 1} lotteryInfo={lotteryInfo} />
    </>
  )
}

export default LotteryInformation
