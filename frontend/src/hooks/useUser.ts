'use client'

import { User } from '@prisma/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Address } from 'viem'
import { userKeys } from '@/app/api/[[...route]]/user'
import { updateUserInfo } from '@/server/user/action'

const fetcher = async (url: string): Promise<User> => {
  const res = await fetch(url, { credentials: 'include' })
  const userInfo = (await res.json()) as User
  return userInfo
}

const defaultUser = {
  id: 0,
  address: '0x0',
  name: 'Unknown',
  iconUrl: '',
} as User

export function useUser(address: Address) {
  const { data, error } = useSuspenseQuery<User>({
    queryKey: userKeys.user(address ?? '0x0'),
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

export function useUpdateUser(address: Address) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      name,
      address,
      iconUrl,
      signature,
    }: {
      name: string
      address: Address
      iconUrl: string
      signature: Address
    }) => await updateUserInfo({ name, address, iconUrl, signature }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.user(address) })
    },
  })
}
