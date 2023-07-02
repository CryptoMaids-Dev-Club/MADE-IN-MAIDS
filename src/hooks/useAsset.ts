import { useQuery } from 'react-query'
import { axios } from '@/lib/axios'

export type AssetInfo = {
  name: string
  image: string
  attributes: string
  external_url: string
}

export const fetchAsset = async (id: number): Promise<AssetInfo> => {
  const response = await axios.get(`https://api.cryptomaids.tokyo/metadata/crypto_maid/${id}`, {
    timeout: 20000,
  })

  return response.data as unknown as AssetInfo
}

export const fetchAssets = async (tokenIds: number[]): Promise<AssetInfo[]> => {
  const res: AssetInfo[] = []

  // eslint-disable-next-line no-restricted-syntax
  for (const id of tokenIds) {
    // eslint-disable-next-line no-await-in-loop
    const nftInfo = await fetchAsset(id)
    res.push(nftInfo)
  }

  return res
}

export const useAsset = (ids: number[]) => useQuery(['asset', ids], () => fetchAssets(ids))
