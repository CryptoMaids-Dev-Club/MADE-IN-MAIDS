import { env } from '@/env/server.mjs'
import { Hono } from 'hono'
import type { Address } from 'viem'

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

const fetchNFTHolder = async (page: number): Promise<NFTHolder[]> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/nft/owners?chain_id=1&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}`,
    {
      headers: {
        'X-Api-Key': env.CHAINBASE_API_KEY,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`)
  }

  const chainbaseResponse = (await response.json()) as ChainbaseResponse

  if (chainbaseResponse.code !== 0) {
    throw new Error(`Chainbase error!: ${chainbaseResponse.message}`)
  }

  return chainbaseResponse.data
}

const app = new Hono().get('/:page', async (c) => {
  const page = c.req.param('page')
  const nftHolder = await fetchNFTHolder(Number(page))

  return c.json(nftHolder)
})

export default app
