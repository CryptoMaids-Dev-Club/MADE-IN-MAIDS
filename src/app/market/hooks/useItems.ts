import { useContractRead } from 'wagmi'
import { marketContractConfig } from '@/config'
import { formatEther, formatUnits } from 'viem'
import { axios } from '@/lib/axios'
import type { ItemInfo, MarketItemInfo, Metadata } from '../types'

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

export const fetchMarketItems = async (items: ItemInfo[]): Promise<MarketItemInfo[]> => {
  const infos: MarketItemInfo[] = []
  await Promise.all(
    items.map(async (item, index) => {
      try {
        const response = await axios.get(item.tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'), {
          timeout: 20000,
        })
        const metadata = response.data as Metadata
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
        console.log(e)
      }
    })
  )

  infos.sort((a, b) => Number(a.id) - Number(b.id))

  return infos
}

export const useItems = () => {
  const { data: items } = useContractRead({
    ...marketContractConfig,
    functionName: 'fetchMarketItems',
    select: (data) => convert(data as SolidityItemInfo[]),
  })

  return items
}
