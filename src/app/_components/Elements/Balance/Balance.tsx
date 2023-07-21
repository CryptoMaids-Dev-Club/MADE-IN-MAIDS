'use client'

import { maidsContractConfig } from '@/config'
import WalletIcon from '@mui/icons-material/Wallet'
import Grid from '@mui/material/Grid'
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
    <Grid container>
      <WalletIcon sx={{ marginTop: '4px', marginRight: '3px' }} />
      <Typography variant='h6' component='span' sx={{ color: 'gold' }}>
        {balance ?? 0} $MAIDS
      </Typography>
    </Grid>
  )
}

export default Balance
