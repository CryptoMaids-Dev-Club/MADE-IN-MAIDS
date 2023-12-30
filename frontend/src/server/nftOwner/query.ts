import { CHAINBASE_API_KEY } from '@/config/server'
import { ChainbaseResponse } from '@/server/nftOwner'
import 'server-only'
import type { Address } from 'viem'

export const getNftOwner = async (id: number): Promise<Address> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/nft/owner?chain_id=1&contract_address=0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7&token_id=${id}`,
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

  const ownerAddress = chainbaseResponse.data

  return ownerAddress
}
