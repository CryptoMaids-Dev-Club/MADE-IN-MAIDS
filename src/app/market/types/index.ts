export type ItemInfo = {
  name: string
  price: string | number
  supply: number
  tokenURI: string
}

export type Metadata = {
  name: string
  description: string
  attributes: string[]
  image: string
  external_url: string
  nsfw: boolean
}

export type MarketItemInfo = ItemInfo & {
  id: string | number
  description: string
  image: string
  external_url: string
  nsfw: boolean
}
