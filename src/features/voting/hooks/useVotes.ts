import { votingContractConfig } from '@/config'
import { useContractRead } from 'wagmi'
import { formatEther } from 'viem'
import type { SolidityVote, Vote } from '@/features/voting'

export const sort = (solidityVotes: SolidityVote[]) => {
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

export const useTop5Votes = (matches: boolean) => {
  const { data: votes } = useContractRead({
    ...votingContractConfig,
    functionName: 'getAllVotes',
    select: (data) => sort(data as SolidityVote[]),
  })
  if (votes === undefined) return { ids: [0, 1, 2, 3, 4], amounts: [0, 0, 0] }
  const ids = matches
    ? [votes[1].id, votes[0].id, votes[2].id, votes[3].id, votes[4].id]
    : [votes[0].id, votes[1].id, votes[2].id, votes[3].id, votes[4].id]

  const amounts = matches
    ? [votes[1].amount, votes[0].amount, votes[2].amount, votes[3].amount, votes[4].amount]
    : [votes[0].amount, votes[1].amount, votes[2].amount, votes[3].amount, votes[4].amount]

  return { ids, amounts }
}
