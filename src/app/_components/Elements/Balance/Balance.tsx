'use client'

import { maidsContractConfig } from '@/config'
import WalletIcon from '@mui/icons-material/Wallet'
import Typography from '@mui/material/Typography'
import { useAccount, useContractRead } from 'wagmi'
import { formatEther } from 'viem'

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
    <>
      <WalletIcon sx={{ display: { xs: 'none', sm: 'block' }, marginTop: '4px', marginRight: '3px' }} />
      <Typography variant='h6' sx={{ color: 'gold' }}>
        {balance ?? 0} $MAIDS
      </Typography>
    </>
  )
}

export default Balance
