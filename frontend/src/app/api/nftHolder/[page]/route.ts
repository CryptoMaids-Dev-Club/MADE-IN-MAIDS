import { NextRequest, NextResponse } from 'next/server'
import { CHAINBASE_API_KEY } from '@/config/server'
import { ChainbaseResponse, NFTHolder } from './nftHolder'

const fetchNFTHolder = async (page: number): Promise<NFTHolder[]> => {
	const response = await fetch(
		`https://api.chainbase.online/v1/nft/owners?chain_id=1&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}`,
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
	const nftHolder = await fetchNFTHolder(Number(params.page))

	return NextResponse.json(nftHolder)
}

export const revalidate = 60 * 60 // 1 hour
export const runtime = 'edge'
