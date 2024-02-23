import { createConfig, http } from '@wagmi/core'
import { polygon, sepolia } from 'wagmi/chains'
import { NETWORK } from '@/config/server'

export const wagmiConfig = createConfig({
  chains: [NETWORK],
  ssr: true,
  transports: {
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
})
