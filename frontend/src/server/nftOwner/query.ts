import { CHAINBASE_API_KEY } from '@/config/server'
import { ChainbaseResponse } from '@/server/nftOwner'
import 'server-only'
import type { Address } from 'viem'

export const getNftOwner = async (id: number): Promise<Address> => {
  const response = (await fetch(
    `https://api.chainbase.online/v1/nft/owner?chain_id=1&contract_address=0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7&token_id=${id}`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  ).then((res) => res.json())) as unknown as ChainbaseResponse

  const ownerAddress = response.data

  return ownerAddress
}
