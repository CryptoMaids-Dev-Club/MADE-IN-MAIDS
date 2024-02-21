import type { AssetInfo } from '@/server/asset'

export type OwnedResponse = {
	code: number
	message: string
	data: OwnedNFTs[]
	next_page: number
}

export type OwnedAssetInfo = {
	assets: OwnedNFTs[]
	next_page: number
}

export type OwnedNFTs = AssetInfo & {
	image_uri: string
	name: string
	owner: string
	token_id: string
	token_uri: string
}

export type ChainbaseResponse = {
	code: number
	message: string
	data: OwnedNFTs[]
	next_page: number
	count: number
}
