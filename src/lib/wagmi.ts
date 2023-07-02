import { getDefaultWallets } from '@rainbow-me/rainbowkit'

import '@rainbow-me/rainbowkit/styles.css'
import { createConfig, configureChains } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { INFURA_API_KEY, WALLET_CONNECT_ID, NETWORK } from '@/config'

export const { chains, publicClient } = configureChains(
  [NETWORK],
  [infuraProvider({ apiKey: INFURA_API_KEY }), publicProvider()]
)

const projectId = WALLET_CONNECT_ID
const { connectors } = getDefaultWallets({
  appName: 'MadeInMaids',
  projectId,
  chains,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
