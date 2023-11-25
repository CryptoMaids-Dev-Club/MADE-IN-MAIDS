'use client'

import { useAccount, useContractRead } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { SolidityUserInfo } from '@/app/api/prediction/prediction'
import { Typography } from '@/components/ui/Typography'
import { maidsPredictionContractConfig } from '@/config/client'

type PredictionUserInfoProps = {
  id: number
  choices: string[]
}

const PredictionUserInfo = ({ id, choices }: PredictionUserInfoProps) => {
  const { address, isConnected } = useAccount()

  const { data: userInfo } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getUserInfo',
    args: [address, id],
    cacheOnBlock: true,
    suspense: true,
    enabled: isConnected,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  return (
    <>
      <Typography variant='h4' className='text-blue-300'>
        Choice: {userInfo?.isPredicted ? choices[userInfo?.choice] : 'No prediction yet'}
        <br />
        Amount: {userInfo?.amount ?? 0}
      </Typography>
    </>
  )
}

export default PredictionUserInfo
