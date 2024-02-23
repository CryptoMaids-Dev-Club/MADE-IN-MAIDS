import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useSimulateMaidsTokenApprove } from '@/lib/generated'
import type { Address } from 'viem'

export const useApprove = (spender: Address) => {
  const { data } = useSimulateMaidsTokenApprove({
    args: [spender, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffff')],
  })

  const { data: writeData, isPending, writeContract } = useWriteContract()

  const { isLoading } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  if (!data) return { approve: () => {} }

  return { isPending: isPending || isLoading, approve: () => writeContract(data.request) }
}
