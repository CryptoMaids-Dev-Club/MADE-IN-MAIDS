export type NFTHolder = {
  address: string
  total: number
}

export type ChainbaseResponse = {
  code: number
  message: string
  data: NFTHolder[]
  next_page: number
  count: number
}
