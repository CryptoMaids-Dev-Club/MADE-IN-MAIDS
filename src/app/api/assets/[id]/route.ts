import { NextRequest, NextResponse } from 'next/server'
import type { AssetInfo } from './asset'

const fetchAsset = async (id: number): Promise<AssetInfo> => {
  const response = await fetch(`https://api.cryptomaids.tokyo/metadata/crypto_maid/${id}`)
  const asset = (await response.json()) as unknown as AssetInfo

  return asset
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, import/prefer-default-export
export async function GET(_req: NextRequest, { params }: { params: { id: number } }) {
  const data = await fetchAsset(params.id)

  return NextResponse.json(data)
}
