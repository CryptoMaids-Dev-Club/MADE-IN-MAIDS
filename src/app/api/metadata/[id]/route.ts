import { NextRequest, NextResponse } from 'next/server'
import type { NFTMetadata } from './metadata'

const getMetadata = async (id: string) => {
  const metadataId = [5, 1, 3, 6]
  // ToDO: Modify Original Metadata URL
  const res = await fetch(
    `https://cryptomaids-art.s3.ap-northeast-1.amazonaws.com/market/metadata/${metadataId[Number(id)]}.json`
  )
  const data = (await res.json()) as NFTMetadata

  return data
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const data = await getMetadata(params.id)

  return NextResponse.json(data)
}
