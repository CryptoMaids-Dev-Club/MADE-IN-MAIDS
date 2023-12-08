'use client'

import { Wallet2 } from 'lucide-react'
import { formatEther } from 'viem'
import { useAccount, useContractRead } from 'wagmi'
import { Typography } from '@/components/ui/typography'
import { maidsContractConfig } from '@/config/client'

export const Balance = () => {
  const { address } = useAccount()
  const { data: balance } = useContractRead({
    ...maidsContractConfig,
    functionName: 'balanceOf',
    args: [address],
    enabled: address !== undefined,
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  return (
    <div className='flex flex-row'>
      <Wallet2 className='mr-1 mt-1' />
      <Typography className='text-yellow-400' variant='h4'>
        {balance ?? 0} $MAIDS
      </Typography>
    </div>
  )
}

export default Balance
