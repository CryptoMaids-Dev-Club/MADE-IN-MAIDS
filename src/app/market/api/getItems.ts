import { readContract, createConfig, configureChains } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'
import { marketContractConfig } from '@/config'
import { formatEther, formatUnits } from 'viem'

import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import type { ItemInfo } from '../types'

export const { chains, publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
)

export const config = createConfig({
  publicClient,
})

type SolidityItemInfo = {
  name: string
  price: bigint
  supply: bigint
  tokenURI: string
}

const convert = (items: SolidityItemInfo[]) => {
  const convertedItems: ItemInfo[] = []
  items.forEach((item) => {
    const convertedItem: ItemInfo = {
      name: item.name,
      price: formatEther(item.price),
      supply: Number(formatUnits(item.supply, 0)),
      tokenURI: item.tokenURI,
    }
    convertedItems.push(convertedItem)
  })

  return convertedItems
}

export const getItems = async () => {
  const data = await readContract({
    ...marketContractConfig,
    functionName: 'fetchMarketItems',
  })

  return convert(data as SolidityItemInfo[])
}
