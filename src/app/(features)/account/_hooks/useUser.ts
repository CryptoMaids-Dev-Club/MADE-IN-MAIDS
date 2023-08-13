'use client'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@prisma/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import useSWRImmutable from 'swr/immutable'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useUser(address: string) {
  const { data, error, isLoading } = useSWRImmutable(`/api/user/${address}`, fetcher)

  return {
    userInfo: (data as User) ?? { name: 'NO NAME', address: '0x', iconUrl: '' },
    isLoading,
    isError: error,
  }
}
