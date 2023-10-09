import { formatEther } from 'viem'
import { useContractRead } from 'wagmi'
import { maidsContractConfig } from '@/config'
import type { Address } from 'wagmi'

export const useAllowance = (account?: Address, spender?: string) => {
  const { data: allowance, refetch } = useContractRead({
    ...maidsContractConfig,
    functionName: 'allowance',
    args: [account, spender],
    enabled: account !== undefined,
    select: (data) => Number(formatEther(data as bigint)),
  })

  return { allowance, refetch }
}

export default useAllowance
