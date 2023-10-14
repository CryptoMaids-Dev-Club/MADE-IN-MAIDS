'use client'

import Typography from '@mui/material/Typography'
import { useAccount, useContractRead } from 'wagmi'
import { convertUserInfo } from '@/app/(features)/prediction/utils'
import { SolidityUserInfo } from '@/app/api/prediction/prediction'
import { maidsPredictionContractConfig } from '@/config'

type PredictionUserInfoProps = {
  id: number
  choices: string[]
}

const PredictionUserInfo = ({ id, choices }: PredictionUserInfoProps) => {
  const { address } = useAccount()

  const { data: userInfo } = useContractRead({
    ...maidsPredictionContractConfig,
    functionName: 'getUserInfo',
    args: [address, id],
    cacheOnBlock: true,
    select: (data) => convertUserInfo(data as SolidityUserInfo),
  })

  return (
    <>
      <Typography variant='h4'>Your Prediction</Typography>
      <Typography variant='body1' color='cyan'>
        Choice: {userInfo?.isPredicted ? choices[userInfo?.choice] : 'No prediction yet'}
        <br />
        Amount: {userInfo?.amount ?? 0}
      </Typography>
    </>
  )
}

export default PredictionUserInfo
