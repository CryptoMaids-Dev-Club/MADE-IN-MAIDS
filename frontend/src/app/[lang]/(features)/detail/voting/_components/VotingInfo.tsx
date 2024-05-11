'use client'

import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { Typography } from '@/components/ui/typography'
import { useReadMaidsVotingGetVoteAmountsOfToken, useReadMaidsVotingGetVoteAmountsOfUser } from '@/lib/generated'

type VotingInfoProps = {
  id: number
}

export const VotingInfo = ({ id }: VotingInfoProps) => {
  const { address } = useAccount()

  const { data: amountOfToken } = useReadMaidsVotingGetVoteAmountsOfToken({
    args: [BigInt(id)],
    query: {
      select: (data) => Math.floor(Number(formatEther(data as bigint))),
    },
  })

  const { data: amountOfUser } = useReadMaidsVotingGetVoteAmountsOfUser({
    args: [address ?? '0x0', BigInt(id)],
    query: {
      enabled: address !== undefined,
      select: (data) => Math.floor(Number(formatEther(data as bigint))),
    },
  })

  return (
    <div>
      <Typography variant='h3'>{`Number of Votes:${amountOfToken ?? 0}`}</Typography>
      <Typography variant='h3'>{`Your Votes:${amountOfUser ?? 0}`}</Typography>
    </div>
  )
}

export default VotingInfo
