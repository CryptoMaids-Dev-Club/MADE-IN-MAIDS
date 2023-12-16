import { configureChains } from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { INFURA_API_KEY, NETWORK } from '@/config/server'

export const { publicClient } = configureChains(
  [NETWORK],
  [infuraProvider({ apiKey: INFURA_API_KEY }), publicProvider()]
)
