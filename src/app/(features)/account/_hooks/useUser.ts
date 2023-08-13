'use client'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@prisma/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useUser(address: string) {
  const { data, error, isLoading } = useSWR(
    `https://made-in-maids-git-develop-maids-dev-club.vercel.app/api/user/${address}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  )

  return {
    userInfo: (data as User) ?? { name: 'NO NAME', address: '0x', iconUrl: '' },
    isLoading,
    isError: error,
  }
}
