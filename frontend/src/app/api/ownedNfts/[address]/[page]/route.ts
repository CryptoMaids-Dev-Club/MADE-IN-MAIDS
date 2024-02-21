import { NextRequest, NextResponse } from 'next/server'
import { Address } from 'viem'
import { CHAINBASE_API_KEY } from '@/config/server'
import prisma from '@/lib/prisma'
import { ChainbaseResponse, OwnedAssetInfo, OwnedNFTs } from './ownedNft'
import type { AssetInfo } from '@/server/asset'

const fetchOwnedNFTs = async (
	address: Address,
	page: number,
): Promise<OwnedAssetInfo> => {
	const response = await fetch(
		`https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}&limit=10`,
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

	const ownedNFTs = chainbaseResponse.data

	if (ownedNFTs === null) {
		return {} as OwnedAssetInfo
	}

	const maidProfiles = await prisma.maidProfile.findMany()

	const assets = [] as OwnedNFTs[]
	await Promise.all(
		ownedNFTs.map(async (nft) => {
			const res = await fetch(
				`https://api.cryptomaids.tokyo/metadata/crypto_maid/${nft.token_id}`,
			)
			const asset = (await res.json()) as unknown as AssetInfo

			const index = maidProfiles.findIndex((e) => e.id === Number(nft.token_id))
			if (index !== -1) {
				assets.push({ ...nft, ...asset, name: maidProfiles[index].name })
			} else {
				assets.push({ ...nft, ...asset })
			}
		}),
	)

	return { assets, next_page: chainbaseResponse.next_page }
}

export async function GET(
	_req: NextRequest,
	{ params }: { params: { address: string; page: string } },
) {
	const ownedNfts = await fetchOwnedNFTs(
		params.address as Address,
		Number(params.page),
	)

	return NextResponse.json(ownedNfts)
}

export const revalidate = 60 // 1 minute
