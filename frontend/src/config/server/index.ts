import { polygon, sepolia } from '@wagmi/core/chains'
import { env } from '@/env/server.mjs'

export const INFURA_API_KEY = env.NEXT_PUBLIC_INFURA_API_KEY
export const CHAINBASE_API_KEY = env.CHAINBASE_API_KEY
export const NETWORK = env.NEXT_PUBLIC_NETWORK === 'mainnet' ? polygon : sepolia
export const CHAIN_ID = NETWORK.id
