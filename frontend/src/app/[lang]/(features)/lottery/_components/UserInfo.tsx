'use client'

import { useTranslation } from 'react-i18next'
import useLottery from '@/app/[lang]/(features)/lottery/_hooks/useLottery'
import useMedalAndTicket from '@/app/[lang]/(features)/lottery/_hooks/useMedalAndTicket'
import { useLanguage } from '@/app/i18n/client'
import { Typography } from '@/components/ui/typography'

type UserInfoProps = {
  lotteryId: number
}

const UserInfo = ({ lotteryId }: UserInfoProps) => {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const { medalBalance, ticketBalance } = useMedalAndTicket()
  const { entryCounts } = useLottery({ lotteryId })

  // const { address } = useAccount()
  // const { data } = useReadContracts({
  //   allowFailure: false,
  //   contracts: [
  //     {
  //       address: medalNftConfig.address[NETWORK.id],
  //       abi: medalNftConfig.abi,
  //       functionName: 'balanceOf',
  //       args: [address ?? '0x', 0n],
  //     },
  //     {
  //       address: ticketNftConfig.address[NETWORK.id],
  //       abi: ticketNftConfig.abi,
  //       functionName: 'balanceOf',
  //       args: [address ?? '0x', 0n],
  //     },
  //     {
  //       address: maidsLotteryConfig.address[NETWORK.id],
  //       abi: maidsLotteryConfig.abi,
  //       functionName: 'entryCountsByLotteryId',
  //       args: [BigInt(lotteryId), address ?? '0x'],
  //     },
  //   ],
  // })

  // const [medalBalance, ticketBalance, entryCounts] = data || []

  return (
    <div>
      <Typography variant='largeText'>
        {t('lottery:medalBalance')}: {medalBalance?.toString()}
      </Typography>
      <Typography variant='largeText'>
        {t('lottery:ticketBalance')}: {ticketBalance?.toString()}
      </Typography>
      <Typography variant='largeText'>
        {t('lottery:entryCount')}: {entryCounts?.toString()}
      </Typography>
    </div>
  )
}

export default UserInfo
