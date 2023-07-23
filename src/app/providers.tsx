'use client'

import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import React from 'react'

import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { polygon } from '@wagmi/core/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { WALLET_CONNECT_ID } from '@/config'
import theme from './theme'

export const { chains, publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
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
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  </ThemeProvider>
)

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
