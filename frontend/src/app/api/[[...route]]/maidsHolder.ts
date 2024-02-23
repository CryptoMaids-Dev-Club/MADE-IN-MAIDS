import { Hono } from 'hono'
import { Address } from 'viem'
import { CHAINBASE_API_KEY } from '@/config/server'

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

const fetchMaidsHolder = async (page: number): Promise<MaidsHolder[]> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/token/top-holders?chain_id=137&contract_address=0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF&page=${page}&limit=20`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error('HTTP error! status: ' + response.status + ' ' + response.statusText)
  }

  const chainbaseResponse = (await response.json()) as ChainbaseResponse

  if (chainbaseResponse.code !== 0) {
    throw new Error('Chainbase error!: ' + chainbaseResponse.message)
  }

  return chainbaseResponse.data
}

const app = new Hono().get('/:page', async (c) => {
  const page = c.req.param('page')
  const maidsHolder = await fetchMaidsHolder(Number(page))

  return c.json(maidsHolder)
})

export default app
