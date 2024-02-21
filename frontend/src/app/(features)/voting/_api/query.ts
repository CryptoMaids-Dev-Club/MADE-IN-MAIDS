import { readContract } from '@wagmi/core'
import { Address, formatEther } from 'viem'
import { NETWORK } from '@/config/server'
import { maidsVotingAbi, maidsVotingAddress } from '@/lib/generated'
import { wagmiConfig } from '@/lib/wagmicore'
import { getAsset } from '@/server/asset/query'
import type { SolidityVote, TopAsset, Vote } from '../_types'

export const getTopAssets = async (slug: number) => {
	const data = await readContract(wagmiConfig, {
		address: maidsVotingAddress[NETWORK.id] as Address,
		abi: maidsVotingAbi,
		functionName: 'getAllVotes',
	})
	const topVotes = sort(data as SolidityVote[]).slice(0, slug)

	const topAssets = [] as TopAsset[]

	await Promise.all(
		topVotes.map(async (vote, index) => {
			const asset = await getAsset(vote.id)
			topAssets.push({ ...vote, ...asset, rank: index + 1 })
		}),
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
