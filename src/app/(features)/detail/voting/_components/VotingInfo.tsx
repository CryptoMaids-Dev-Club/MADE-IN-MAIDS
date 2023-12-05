'use client'

import { formatEther } from 'viem'
import { useAccount, useContractRead } from 'wagmi'
import { Typography } from '@/components/ui/typography'
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
    <div>
      <Typography variant='h3'>{`Number of Votes:${amountOfToken ?? 0}`}</Typography>
      <Typography variant='h3'>{`Your Votes:${amountOfUser ?? 0}`}</Typography>
    </div>
  )
}

export default VotingInfo
