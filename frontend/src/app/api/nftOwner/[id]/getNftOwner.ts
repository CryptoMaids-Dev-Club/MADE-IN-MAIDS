import { getBaseUrl } from '@/lib/getBaseUrl'

export default async function getNftOwner({ id }: { id: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/nftOwner/${id}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const owner = (await res.json()) as string

    return owner
  } catch (e) {
    console.error(e)

    return '' as string
  }
}

export const revalidate = 60 // 1 minute
