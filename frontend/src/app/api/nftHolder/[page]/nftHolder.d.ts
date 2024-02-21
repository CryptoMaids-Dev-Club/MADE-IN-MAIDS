import { Address } from 'viem'

export type NFTHolder = {
	address: Address
	total: number
}

export type ChainbaseResponse = {
	code: number
	message: string
	data: NFTHolder[]
	next_page: number
	count: number
}
