'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { formatEther } from 'viem'
import { useAccount, useContractRead } from 'wagmi'
import { votingContractConfig } from '@/config/client'

type VotingInfoProps = {
  id: number
}

export const VotingInfo = ({ id }: VotingInfoProps) => {
  const { address } = useAccount()

  const { data: amountOfToken } = useContractRead({
    ...votingContractConfig,
    functionName: 'getVoteAmountsOfToken',
    args: [id],
    cacheOnBlock: true,
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  const { data: amountOfUser } = useContractRead({
    ...votingContractConfig,
    functionName: 'getVoteAmountsOfUser',
    args: [address, id],
    cacheOnBlock: true,
    enabled: address !== undefined,
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <Typography variant='h5' component='span'>
          {`Number of Votes:${amountOfToken ?? 0}`}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography variant='h5' component='span'>
          {`Your Votes:${amountOfUser ?? 0}`}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default VotingInfo
