import { User } from '@prisma/client'

export function getUserName(address: string, userInfos: User[]) {
  const index = userInfos.findIndex((e) => e.address === address)

  return index !== -1 ? userInfos[index].name : address
}

export function getUserIcon(address: string, userInfos: User[]) {
  const index = userInfos.findIndex((e) => e.address === address)

  return index !== -1 ? userInfos[index].iconUrl : ''
}
