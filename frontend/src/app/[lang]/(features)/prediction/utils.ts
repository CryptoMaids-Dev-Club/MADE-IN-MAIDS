import { formatEther } from 'viem'
import { SolidityUserInfo } from '@/app/[lang]/(features)/prediction/_types'

export function convertUserInfo(data: SolidityUserInfo) {
  return {
    amount: Math.floor(Number(formatEther(data.amount as bigint))),
    choice: Number(data.choice),
    isPredicted: data.isPredicted,
    isClaimed: data.isClaimed,
  }
}
