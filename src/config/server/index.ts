import { polygon } from '@wagmi/core/chains'
import MaidsItemContract from '@/assets/contracts/MaidsItem1155.json'
import MaidsMarketContract from '@/assets/contracts/MaidsMarketPlace.json'
import MaidsPredictionContract from '@/assets/contracts/MaidsPrediction.json'
import MaidsTokenContract from '@/assets/contracts/MaidsToken.json'
import MaidsVotingContract from '@/assets/contracts/MaidsVoting.json'
import { env } from '@/env/server.mjs'
import type { Address } from 'wagmi'

export const INFURA_API_KEY = env.NEXT_PUBLIC_INFURA_API_KEY
export const CHAINBASE_API_KEY = env.CHAINBASE_API_KEY
export const MAIDS_CONTRACT_ADDRESS = env.NEXT_PUBLIC_MAIDS_CONTRACT_ADDRESS as Address
export const MARKET_PROXY_CONTRACT_ADDRESS = env.NEXT_PUBLIC_MARKET_PROXY_CONTRACT_ADDRESS as Address
export const MAIDS_ITEM_CONTRACT_ADDRESS = env.NEXT_PUBLIC_MAIDS_ITEM_CONTRACT_ADDRESS as Address
export const MAIDS_VOTING_CONTRACT_ADDRESS = env.NEXT_PUBLIC_MAIDS_VOTING_CONTRACT_ADDRESS as Address
export const MAIDS_PREDICTION_CONTRACT_ADDRESS = env.NEXT_PUBLIC_MAIDS_PREDICTION_CONTRACT_ADDRESS as Address
export const NETWORK = polygon
export const CHAINS = [polygon]

export const votingContractConfig = {
  address: MAIDS_VOTING_CONTRACT_ADDRESS,
  abi: MaidsVotingContract.abi,
  chainId: polygon.id,
}

export const maidsContractConfig = {
  address: MAIDS_CONTRACT_ADDRESS,
  abi: MaidsTokenContract.abi,
  chainId: polygon.id,
}

export const marketContractConfig = {
  address: MARKET_PROXY_CONTRACT_ADDRESS,
  abi: MaidsMarketContract.abi,
  chainId: polygon.id,
}

export const maidsItemContractConfig = {
  address: MAIDS_ITEM_CONTRACT_ADDRESS,
  abi: MaidsItemContract.abi,
  chainId: polygon.id,
}

export const maidsPredictionContractConfig = {
  address: MAIDS_PREDICTION_CONTRACT_ADDRESS,
  abi: MaidsPredictionContract.abi,
  chainId: polygon.id,
}
