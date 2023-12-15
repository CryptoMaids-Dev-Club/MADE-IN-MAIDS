import { Address, useWaitForTransaction } from 'wagmi'
import { useMaidsTokenApprove } from '@/lib/generated'

export const useApprove = (spender: Address) => {
  const {
    data,
    isLoading,
    write: approve,
  } = useMaidsTokenApprove({
    args: [spender, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffff')],
  })

  const approveTx = useWaitForTransaction({
    hash: data?.hash,
  })

  return { approve, isLoading, approveTx }
}
