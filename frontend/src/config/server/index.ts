import { env } from '@/env/server.mjs'
import { polygon, sepolia } from '@wagmi/core/chains'

export const INFURA_API_KEY = env.NEXT_PUBLIC_INFURA_API_KEY
export const NETWORK = env.NEXT_PUBLIC_NETWORK === 'mainnet' ? polygon : sepolia
export const CHAIN_ID = NETWORK.id
