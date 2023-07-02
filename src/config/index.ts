/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { polygon, polygonMumbai } from 'wagmi/chains'
import type { Address } from 'wagmi'

import MaidsVotingContract from '@/assets/contracts/MaidsVoting.json'
import MaidsTokenContract from '@/assets/contracts/MaidsToken.json'
import MaidsMarketContract from '@/assets/contracts/MaidsMarketPlace.json'
import MaidsItemContract from '@/assets/contracts/MaidsItem1155.json'

export const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY as string
export const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string
export const MAIDS_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_CONTRACT_ADDRESS as Address
export const MARKET_PROXY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKET_PROXY_CONTRACT_ADDRESS as Address
export const MAIDS_ITEM_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_ITEM_CONTRACT_ADDRESS as Address
export const MAIDS_VOTING_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIDS_VOTING_CONTRACT_ADDRESS as Address
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? polygon : polygonMumbai

export const votingContractConfig = {
  address: MAIDS_VOTING_CONTRACT_ADDRESS,
  abi: MaidsVotingContract.abi,
  chainId: NETWORK.id,
}

export const maidsContractConfig = {
  address: MAIDS_CONTRACT_ADDRESS,
  abi: MaidsTokenContract.abi,
  chainId: NETWORK.id,
}

export const marketContractConfig = {
  address: MARKET_PROXY_CONTRACT_ADDRESS,
  abi: MaidsMarketContract.abi,
  chainId: NETWORK.id,
}

export const maidsItemContractConfig = {
  address: MAIDS_ITEM_CONTRACT_ADDRESS,
  abi: MaidsItemContract.abi,
  chainId: NETWORK.id,
}
