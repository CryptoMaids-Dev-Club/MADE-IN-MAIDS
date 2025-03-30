import { env } from '@/env/client.mjs'
import { polygon, sepolia } from 'wagmi/chains'

export const INFURA_API_KEY = env.NEXT_PUBLIC_INFURA_API_KEY
export const WALLET_CONNECT_ID = env.NEXT_PUBLIC_WALLET_CONNECT_ID
export const NETWORK = env.NEXT_PUBLIC_NETWORK === 'mainnet' ? polygon : sepolia
export const CHAIN_ID = NETWORK.id
export const API_SERVER = 'https://maidsstakingpolygon.onrender.com'
