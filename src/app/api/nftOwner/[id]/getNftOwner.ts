import { getBaseUrl } from '@/lib/getBaseUrl'

export default async function getNftOwner({ id }: { id: number }) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/nftOwner/${id}`, {
      next: { revalidate: 60 },
    })

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
