import { Hono } from 'hono'
import { Address } from 'viem'
import { CHAINBASE_API_KEY } from '@/config/server'
import prisma from '@/lib/prisma'
import type { AssetInfo } from '@/server/asset'

export type OwnedResponse = {
  code: number
  message: string
  data: OwnedNFTs[]
  next_page: number
}

export type OwnedAssetInfo = {
  assets: OwnedNFTs[]
  next_page: number
}

export type OwnedNFTs = AssetInfo & {
  image_uri: string
  name: string
  owner: string
  token_id: string
  token_uri: string
}

export type ChainbaseResponse = {
  code: number
  message: string
  data: OwnedNFTs[]
  next_page: number
  count: number
}

const fetchOwnedNFTs = async (address: Address, page: number): Promise<OwnedAssetInfo> => {
  const response = await fetch(
    `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&contract_address=0x5703A3245FF6FAD37fa2a2500F0739d4F6a234E7&page=${page}&limit=10`,
    {
      headers: {
        'X-Api-Key': CHAINBASE_API_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error('HTTP error! status: ' + response.status + ' ' + response.statusText)
  }

  const chainbaseResponse = (await response.json()) as ChainbaseResponse

  const ownedNFTs = chainbaseResponse.data

  if (ownedNFTs === null) {
    return {} as OwnedAssetInfo
  }

  const maidProfiles = await prisma.maidProfile.findMany()

  const assets = [] as OwnedNFTs[]
  await Promise.all(
    ownedNFTs.map(async (nft) => {
      const res = await fetch(`https://api.cryptomaids.tokyo/metadata/crypto_maid/${nft.token_id}`)
      const asset = (await res.json()) as unknown as AssetInfo

      const index = maidProfiles.findIndex((e) => e.id === Number(nft.token_id))
      if (index !== -1) {
        assets.push({ ...nft, ...asset, name: maidProfiles[index].name })
      } else {
        assets.push({ ...nft, ...asset })
      }
    })
  )

  return { assets, next_page: chainbaseResponse.next_page }
}

const app = new Hono().get('/:address/:page', async (c) => {
  const address = c.req.param('address')
  const page = c.req.param('page')
  const ownedNfts = await fetchOwnedNFTs(address as Address, Number(page))

  return c.json(ownedNfts)
})

export default app
