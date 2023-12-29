export type ItemInfo = {
  name: string
  price: number
  supply: number
  tokenURI: string
}

export type MarketItemInfo = ItemInfo & {
  id: number
  description: string
  image: string
  external_url: string
  nsfw: boolean
}

export type NFTMetadata = {
  name: string
  description: string
  attributes: string[]
  image: string
  external_url: string
  nsfw: boolean
}

export type SolidityItemInfo = {
  name: string
  price: bigint
  supply: bigint
  tokenURI: string
  limitPerWallet: bigint
}
