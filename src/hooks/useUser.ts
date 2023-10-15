'use client'

import { User } from '@prisma/client'
import useSWRImmutable from 'swr/immutable'

const fetcher = (url: string) => fetch(url).then((res) => res.json() as unknown as User)

export function useUser(address: string) {
  const { data, isLoading } = useSWRImmutable(address ? `/api/user/${address}` : null, fetcher, {
    suspense: true,
  })

  return {
    userInfo: data,
    isLoading,
  }
}
