'use client'

import { useAccount } from 'wagmi'
import { SolidityUserInfo } from '@/app/(features)/prediction/_types'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { Typography } from '@/components/ui/typography'
import { useReadMaidsPredictionGetUserInfo } from '@/lib/generated'

type PredictionUserInfoProps = {
  id: number
  choices: string[]
}

const PredictionUserInfo = ({ id, choices }: PredictionUserInfoProps) => {
  const { address, isConnected } = useAccount()

  const { data: userInfo } = useReadMaidsPredictionGetUserInfo({
    args: [address ?? '0x0', BigInt(id)],
    query: {
      enabled: isConnected,
      select: (data) => convertUserInfo(data as SolidityUserInfo),
    },
  })

  return (
    <Typography variant='h4' className='text-blue-300'>
      Choice: {userInfo?.isPredicted ? choices[userInfo?.choice] : 'No prediction yet'}
      <br />
      Amount: {userInfo?.amount ?? 0}
    </Typography>
  )
}

export default PredictionUserInfo
