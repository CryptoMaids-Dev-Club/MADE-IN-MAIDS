import { MaidsHolder } from './maidsHolder'

export default async function getMaidsHolder({ page }: { page: number }) {
  try {
    const res = await fetch(`https://made-in-maids-git-develop-maids-dev-club.vercel.app//api/maidsHolder/${page}`)

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const holders = (await res.json()) as MaidsHolder[]

    return holders
  } catch (e) {
    console.error(e)

    return {} as MaidsHolder[]
  }
}
