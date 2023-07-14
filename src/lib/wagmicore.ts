import { createConfig, configureChains } from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { INFURA_API_KEY, NETWORK } from '@/config'

export const { chains, publicClient } = configureChains(
  [NETWORK],
  [infuraProvider({ apiKey: INFURA_API_KEY }), publicProvider()]
)

export const config = createConfig({
  publicClient,
})
