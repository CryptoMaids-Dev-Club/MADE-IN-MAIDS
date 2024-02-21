import { Address } from 'viem'

export type MaidsHolder = {
	amount: string
	original_amount: string
	usd_value: string
	wallet_address: Address
}

export type ChainbaseResponse = {
	code: number
	message: string
	data: MaidsHolder[]
	next_page: number
	count: number
}
