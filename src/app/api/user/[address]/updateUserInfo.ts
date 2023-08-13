import { User } from '@prisma/client'

export default async function updateUserInfo({
  name,
  address,
  iconUrl,
  signature,
}: {
  name: string
  address: string
  iconUrl: string
  signature: string
}) {
  try {
    const res = await fetch(`https://made-in-maids-git-develop-maids-dev-club.vercel.app/api/user/${address}`, {
      method: 'POST',
      body: JSON.stringify({ name, address, iconUrl, signature }),
    })

    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const userInfo = (await res.json()) as User

    return userInfo
  } catch (e) {
    console.error(e)

    throw new Error('Something went wrong!')
  }
}
