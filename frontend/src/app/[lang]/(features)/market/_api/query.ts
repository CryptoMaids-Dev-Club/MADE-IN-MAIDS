import { NETWORK } from '@/config/server'
import { maidsMarketAbi, maidsMarketAddress } from '@/lib/generated'
import { wagmiConfig } from '@/lib/wagmicore'
import { readContract } from '@wagmi/core'
import { type Address, formatEther, formatUnits } from 'viem'
import type { ItemInfo, MarketItemInfo, NFTMetadata, SolidityItemInfo } from '../_types'
import 'server-only'

export const getMarketItems = async () => {
  const data = await readContract(wagmiConfig, {
    address: maidsMarketAddress[NETWORK.id] as Address,
    abi: maidsMarketAbi,
    functionName: 'fetchMarketItems',
  })

  const convertedItems = convert(data as unknown as SolidityItemInfo[])
  const marketItems = await getItemInfo(convertedItems)

  return marketItems
}

const convert = (items: SolidityItemInfo[]) => {
  const convertedItems: ItemInfo[] = []
  for (const item of items) {
    const convertedItem: ItemInfo = {
      name: item.name,
      price: Number(formatEther(item.price)),
      supply: Number(formatUnits(item.supply, 0)),
      tokenURI: item.tokenURI,
      limitPerWallet: Number(formatUnits(item.limitPerWallet, 0)),
    }
    convertedItems.push(convertedItem)
  }
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
          external_url: metadata.external_url?.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          nsfw: metadata.nsfw,
        }
        infos.push(info)
      } catch (e) {
        console.error(e)
      }
    }),
  )

  infos.sort((a, b) => Number(a.id) - Number(b.id))

  return infos
}
