import { maidsContractConfig } from '@/config'
import { useContractRead } from 'wagmi'
import type { Address } from 'wagmi'
import { formatEther } from 'viem'

export const useAllowance = (account?: Address, spender?: string) => {
  const { data: allowance, refetch } = useContractRead({
    ...maidsContractConfig,
    functionName: 'allowance',
    args: [account, spender],
    select: (data) => Number(formatEther(data as bigint)),
  })

  return { allowance, refetch }
}

export default useAllowance
