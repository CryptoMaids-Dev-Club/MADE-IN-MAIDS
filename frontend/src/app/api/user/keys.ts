import { Address } from 'viem'

export const userKeys = {
	all: ['users'] as const,
	users: () => [...userKeys.all, 'users'] as const,
	user: (address: Address) => [...userKeys.users(), address] as const,
}
