'use client'

import { User } from '@prisma/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userKeys } from '@/app/api/user/keys'

const fetcher = async (url: string): Promise<User> => {
  const res = await fetch(url)
  const userInfo = (await res.json()) as User
  return userInfo
}

const defaultUser = {
  id: 0,
  address: '0x',
  name: 'Unknown',
  iconUrl: '',
} as User

export function useUser(address: string) {
  const { data, error } = useSuspenseQuery<User>({
    queryKey: userKeys.user(address ?? '0x'),
    queryFn: () => fetcher(`/api/user/${address}`),
  })

  if (error) {
    console.error(error)
    return {
      userInfo: defaultUser,
    }
  }

  return { address, userInfo: data }
}
