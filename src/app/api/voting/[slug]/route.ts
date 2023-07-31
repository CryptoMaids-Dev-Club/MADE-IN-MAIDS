import { readContract, configureChains, createConfig } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'
import { votingContractConfig } from '@/config'
import { formatEther } from 'viem'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { NextRequest, NextResponse } from 'next/server'
import type { SolidityVote, Vote } from './voting'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { chains, publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = createConfig({
  publicClient,
})

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
    ...votingContractConfig,
    functionName: 'getAllVotes',
  })
  const topVotes = sort(data as SolidityVote[])

  return NextResponse.json(topVotes.slice(0, params.slug))
}

export const dynamic = 'force-dynamic'
