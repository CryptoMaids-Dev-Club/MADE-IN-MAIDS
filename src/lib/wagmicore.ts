import { configureChains } from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { polygon } from 'wagmi/chains'

export const { publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
)
