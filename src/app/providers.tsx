'use client'

import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { SWRConfig } from 'swr'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { NETWORK, WALLET_CONNECT_ID } from '@/config/client'
import { INFURA_API_KEY } from '@/config/client'
import NextAppDirEmotionCacheProvider from './EmotionCache'
import theme from './theme'

export const { chains, publicClient } = configureChains(
  [NETWORK],
  [infuraProvider({ apiKey: INFURA_API_KEY }), publicProvider()]
)

export const wagmiConfig = createConfig({
  publicClient,
})

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

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </SWRConfig>
    </ThemeProvider>
  </NextAppDirEmotionCacheProvider>
)

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
