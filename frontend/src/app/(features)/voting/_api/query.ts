import { readContract, createConfig } from '@wagmi/core'
import { Address, formatEther } from 'viem'
import { NETWORK } from '@/config/server'
import { maidsVotingABI, maidsVotingAddress } from '@/lib/generated'
import { publicClient } from '@/lib/wagmicore'
import { getAsset } from '@/server/asset/query'
import type { SolidityVote, TopAsset, Vote } from '../_types'

createConfig({ publicClient })

export const getTopAssets = async (slug: number) => {
  const data = await readContract({
    address: maidsVotingAddress[NETWORK.id] as Address,
    abi: maidsVotingABI,
    functionName: 'getAllVotes',
  })
  const topVotes = sort(data as SolidityVote[]).slice(0, slug)

  const topAssets = [] as TopAsset[]

  await Promise.all(
    topVotes.map(async (vote, index) => {
      const asset = await getAsset(vote.id)
      topAssets.push({ ...vote, ...asset, rank: index + 1 })
    })
  )

  return topAssets
}

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
