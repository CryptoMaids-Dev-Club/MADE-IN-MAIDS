import { readContract, configureChains, createConfig } from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { Address, formatEther, formatUnits } from 'viem'
import { INFURA_API_KEY, NETWORK } from '@/config/server'
import { maidsMarketABI, maidsMarketAddress } from '@/lib/generated'
import type { ItemInfo, MarketItemInfo, NFTMetadata, SolidityItemInfo } from './marketItem'
import 'server-only'

const { publicClient } = configureChains([NETWORK], [infuraProvider({ apiKey: INFURA_API_KEY }), publicProvider()])

createConfig({ publicClient })

export const getMarketItems = async () => {
  const data = await readContract({
    address: maidsMarketAddress[NETWORK.id] as Address,
    abi: maidsMarketABI,
    functionName: 'fetchMarketItems',
  })

  const convertedItems = convert(data as unknown as SolidityItemInfo[])
  const marketItems = await getItemInfo(convertedItems)

  return marketItems
}

const convert = (items: SolidityItemInfo[]) => {
  const convertedItems: ItemInfo[] = []
  items.forEach((item) => {
    const convertedItem: ItemInfo = {
      name: item.name,
      price: Number(formatEther(item.price)),
      supply: Number(formatUnits(item.supply, 0)),
      tokenURI: item.tokenURI,
    }
    convertedItems.push(convertedItem)
  })

  return convertedItems
}

const getItemInfo = async (items: ItemInfo[]): Promise<MarketItemInfo[]> => {
  if (items === undefined) return []

  const infos: MarketItemInfo[] = []
  await Promise.all(
    items.map(async (item, index) => {
      try {
        const response = await fetch(item.tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
        const metadata = (await response.json()) as NFTMetadata
        const info = {
          ...item,
          id: index,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          external_url: metadata.external_url && metadata.external_url.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          nsfw: metadata.nsfw,
        }
        infos.push(info)
      } catch (e) {
        console.error(e)
      }
    })
  )

  infos.sort((a, b) => Number(a.id) - Number(b.id))

  return infos
}
