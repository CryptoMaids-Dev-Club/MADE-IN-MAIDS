'use client'

import type { User } from '@prisma/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { hc } from 'hono/client'
import type { Address } from 'viem'
import type { AppType } from '@/app/[[...route]]/route'
import { userKeys } from '@/app/[[...route]]/user'
import { updateUserInfo } from '@/server/user/action'

const client = hc<AppType>('/')

const defaultUser = {
  id: 0,
  address: '0x0',
  name: 'Unknown',
  iconUrl: '',
} as User

export function useUser(address: Address) {
  const { data, error } = useSuspenseQuery<User>({
    queryKey: userKeys.user(address ?? '0x0'),
    queryFn: async () => {
      const res = await client.api.user[':address'].$get({
        param: {
          address: address.toString(),
        },
      })
      return await res.json()
    },
  })

  if (error) {
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
