import { useContractRead } from 'wagmi'
import { marketContractConfig } from '@/config'
import { formatEther, formatUnits } from 'viem'
import type { ItemInfo } from '../types'

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

export const useItems = () => {
  const { data: items } = useContractRead({
    ...marketContractConfig,
    functionName: 'fetchMarketItems',
    select: (data) => convert(data as SolidityItemInfo[]),
  })

  return items
}

export default useItems
