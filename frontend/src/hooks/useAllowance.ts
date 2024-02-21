import { formatEther } from 'viem'
import { useReadMaidsTokenAllowance } from '@/lib/generated'
import type { Address } from 'viem'

export const useAllowance = (account: Address, spender: string) => {
	const { data: allowance, refetch } = useReadMaidsTokenAllowance({
		args: [account, spender as Address],
		query: {
			enabled: account !== '0x0',
		},
	})

	return { allowance: allowance ? Number(formatEther(allowance)) : 0, refetch }
}

export default useAllowance
