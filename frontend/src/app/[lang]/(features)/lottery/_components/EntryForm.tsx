'use client'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useLottery from '@/app/[lang]/(features)/lottery/_hooks/useLottery'
import { LotteryInfo } from '@/app/[lang]/(features)/lottery/_type'
import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { useLanguage, useTranslation } from '@/app/i18n/client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

type EntryFormProps = {
  lotteryId: number
  lotteryInfo: LotteryInfo
}

const EntryForm = ({ lotteryId, lotteryInfo }: EntryFormProps) => {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const {
    share,
    maxShare,
    entryCounts,
    isPending,
    buttonMessage,
    disabled,
    updateShare,
    entryOrApprove,
    returnTicket,
  } = useLottery({
    lotteryId,
  })
  const range = Math.min(maxShare, 10)

  return (
    <>
      <div className='grid grid-cols-5 gap-4'>
        {lotteryInfo.ended ? (
          <div className='col-span-4'>
            <LoadingButtonForWeb3
              className='w-full bg-yellow-300 text-xl'
              loading={isPending}
              onClick={returnTicket}
              disabled={!entryCounts}>
              Return Tickets
            </LoadingButtonForWeb3>
          </div>
        ) : (
          <div className='col-span-4'>
            <LoadingButtonForWeb3
              className='w-full bg-yellow-300 text-xl'
              loading={isPending}
              onClick={entryOrApprove}
              disabled={disabled}>
              {buttonMessage}
            </LoadingButtonForWeb3>
          </div>
        )}

        <div className='col-span-1'>
          <Select value={share.toString()} onValueChange={(e) => updateShare(Number(e))}>
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[...Array(range)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Typography variant='smallText'>{t('lottery:attention')}</Typography>
    </>
  )
}

export default EntryForm
