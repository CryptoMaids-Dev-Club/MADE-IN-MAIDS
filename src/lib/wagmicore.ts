import { configureChains } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { INFURA_API_KEY } from '@/config/server'

export const { publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: INFURA_API_KEY }), publicProvider()]
)
