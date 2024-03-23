import { readContract } from '@wagmi/core'
import { NETWORK } from '@/config/server'
import { maidsLotteryConfig } from '@/lib/generated'
import { wagmiConfig } from '@/lib/wagmicore'
import 'server-only'
import type { Address } from 'viem'

export const getLotteryInfo = async () => {
  const data = await readContract(wagmiConfig, {
    address: maidsLotteryConfig.address[NETWORK.id] as Address,
    abi: maidsLotteryConfig.abi,
    functionName: 'getAllLotteries',
  })

  return data
}
