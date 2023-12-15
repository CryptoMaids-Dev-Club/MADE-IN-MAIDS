import { formatEther } from 'viem'
import { useMaidsTokenAllowance } from '@/lib/generated'
import type { Address } from 'wagmi'

export const useAllowance = (account: Address, spender: string) => {
  const { data: allowance, refetch } = useMaidsTokenAllowance({
    args: [account, spender as Address],
    enabled: account !== '0x0',
  })

  return { allowance: allowance ? Number(formatEther(allowance)) : 0, refetch }
}

export default useAllowance
