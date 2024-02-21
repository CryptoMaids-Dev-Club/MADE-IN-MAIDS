import { User } from '@prisma/client'
import { Address } from 'viem'

export function getUserName(address: Address, userInfos: User[]) {
	const index = userInfos.findIndex((e) => e.address === address)

	return index !== -1 ? userInfos[index].name : address
}

export function getUserIcon(address: Address, userInfos: User[]) {
	const index = userInfos.findIndex((e) => e.address === address)

	return index !== -1 ? userInfos[index].iconUrl : ''
}
