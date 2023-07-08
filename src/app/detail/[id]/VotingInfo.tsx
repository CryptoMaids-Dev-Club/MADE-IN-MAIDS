import { Grid, Typography, useMediaQuery } from '@mui/material'
import { formatEther } from 'viem'
import { Address, useContractRead } from 'wagmi'
import { votingContractConfig } from '@/config'

type VotingInfoProps = {
  address: Address
  id: number
}

export const VotingInfo = ({ address, id }: VotingInfoProps) => {
  const matches = useMediaQuery('(min-width: 560px)')

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
    select: (data) => Math.floor(Number(formatEther(data as bigint))),
  })

  return (
    <>
      <Grid item md={12} xs={12} sx={{ maxHeight: matches ? 300 : 100 }}>
        <Typography variant='h5' component='span' sx={{ color: 'black' }}>
          {`Number of Votes:${amountOfToken ?? 0}`}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12} sx={{ maxHeight: matches ? 300 : 100 }}>
        <Typography variant='h5' component='span' sx={{ color: 'black' }}>
          {`Your Votes:${amountOfUser ?? 0}`}
        </Typography>
      </Grid>
    </>
  )
}

export default VotingInfo
