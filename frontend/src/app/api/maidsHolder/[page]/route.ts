import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import { MaidsHolder, ChainbaseResponse } from './maidsHolder'

const fetchMaidsHolder = async (page: number): Promise<MaidsHolder[]> => {
	const response = await fetch(
		`https://api.chainbase.online/v1/token/top-holders?chain_id=137&contract_address=0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF&page=${page}&limit=20`,
		{
			headers: {
				'X-Api-Key': CHAINBASE_API_KEY,
			},
		},
	)

	if (!response.ok) {
		throw new Error(
			'HTTP error! status: ' + response.status + ' ' + response.statusText,
		)
	}

	const chainbaseResponse = (await response.json()) as ChainbaseResponse

	if (chainbaseResponse.code !== 0) {
		throw new Error('Chainbase error!: ' + chainbaseResponse.message)
	}

	return chainbaseResponse.data
}

export async function GET(
	_req: NextRequest,
	{ params }: { params: { page: string } },
) {
	const maidsHolder = await fetchMaidsHolder(Number(params.page))

	return NextResponse.json(maidsHolder)
}

export const revalidate = 60 * 60 // 1 hour
export const runtime = 'edge'
