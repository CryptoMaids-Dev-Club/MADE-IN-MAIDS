import type { AssetInfo } from '.'
import 'server-only'

export const getAsset = async (id: number) => {
  const response = await fetch(`https://api.cryptomaids.tokyo/metadata/crypto_maid/${id}`)
  const asset = (await response.json()) as unknown as AssetInfo

  return asset
}
