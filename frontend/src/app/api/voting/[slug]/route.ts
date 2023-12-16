import { readContract, createConfig } from '@wagmi/core'
import { NextRequest, NextResponse } from 'next/server'
import { Address, formatEther } from 'viem'
import { NETWORK } from '@/config/server'
import { maidsVotingABI, maidsVotingAddress } from '@/lib/generated'
import { publicClient } from '@/lib/wagmicore'
import type { SolidityVote, Vote } from './voting'

createConfig({ publicClient })

const sort = (solidityVotes: SolidityVote[]) => {
  const votes: Vote[] = []
  solidityVotes.forEach((value) => {
    const vote: Vote = {
      id: Number(value.id),
      amount: Number(formatEther(value.amount)),
    }
    votes.push(vote)
  })

  const copyVotes = [...votes]
  copyVotes.sort((a, b) => b.amount - a.amount)

  return copyVotes
}

export async function GET(_req: NextRequest, { params }: { params: { slug: number } }) {
  const data = await readContract({
    address: maidsVotingAddress[NETWORK.id] as Address,
    abi: maidsVotingABI,
    functionName: 'getAllVotes',
  })
  const topVotes = sort(data as SolidityVote[])

  return NextResponse.json(topVotes.slice(0, params.slug))
}

export const dynamic = 'force-dynamic'
