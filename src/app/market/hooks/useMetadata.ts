import { useQuery } from 'react-query'
import { axios } from '@/lib/axios'
import { ItemInfo, MarketItemInfo, Metadata } from '../types'

export const fetchMarketItems = async (items: ItemInfo[]): Promise<MarketItemInfo[]> => {
  if (items === undefined) return []

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

export const useMetadata = (items: ItemInfo[]) => useQuery(['marketItems', items], () => fetchMarketItems(items))
