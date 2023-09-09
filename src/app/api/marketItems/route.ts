import { readContract, configureChains, createConfig } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'
import { marketContractConfig } from '@/config'
import { formatEther, formatUnits } from 'viem'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { NextRequest, NextResponse } from 'next/server'
import type { ItemInfo, MarketItemInfo, SolidityItemInfo } from './marketItem'
import type { NFTMetadata } from '@/app/api/metadata/[id]/metadata'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { chains, publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = createConfig({
  publicClient,
})

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
const getMarketItems = async (items: ItemInfo[]): Promise<MarketItemInfo[]> => {
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

export async function GET(_req: NextRequest) {
  const data = await readContract({
    ...marketContractConfig,
    functionName: 'fetchMarketItems',
  })
  const convertedItems = convert(data as SolidityItemInfo[])
  const marketItems = await getMarketItems(convertedItems)

  return NextResponse.json(marketItems)
}

export const revalidate = 600
