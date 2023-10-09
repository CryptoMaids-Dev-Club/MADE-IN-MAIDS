import { polygon, polygonMumbai } from 'wagmi/chains'
import MaidsItemContract from '@/assets/contracts/MaidsItem1155.json'
import MaidsMarketContract from '@/assets/contracts/MaidsMarketPlace.json'
import MaidsPredictionContract from '@/assets/contracts/MaidsPrediction.json'
import MaidsTokenContract from '@/assets/contracts/MaidsToken.json'
import MaidsVotingContract from '@/assets/contracts/MaidsVoting.json'
import type { Address } from 'wagmi'

export const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY as string
export const CHAINBASE_API_KEY = process.env.NEXT_PUBLIC_CHAINBASE_API_KEY as string
export const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string
export const MAIDS_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_CONTRACT_ADDRESS as Address
export const MARKET_PROXY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKET_PROXY_CONTRACT_ADDRESS as Address
export const MAIDS_ITEM_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_ITEM_CONTRACT_ADDRESS as Address
export const MAIDS_VOTING_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_VOTING_CONTRACT_ADDRESS as Address
export const MAIDS_PREDICTION_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_PREDICTION_CONTRACT_ADDRESS as Address
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? polygon : polygonMumbai

export const votingContractConfig = {
  address: MAIDS_VOTING_CONTRACT_ADDRESS,
  abi: MaidsVotingContract.abi,
  chainId: 137,
}

export const maidsContractConfig = {
  address: MAIDS_CONTRACT_ADDRESS,
  abi: MaidsTokenContract.abi,
  chainId: 11155111,
}

export const marketContractConfig = {
  address: MARKET_PROXY_CONTRACT_ADDRESS,
  abi: MaidsMarketContract.abi,
  chainId: 137,
}

export const maidsItemContractConfig = {
  address: MAIDS_ITEM_CONTRACT_ADDRESS,
  abi: MaidsItemContract.abi,
  chainId: 137,
}

export const maidsPredictionContractConfig = {
  address: MAIDS_PREDICTION_CONTRACT_ADDRESS,
  abi: MaidsPredictionContract.abi,
  chainId: 11155111,
}
