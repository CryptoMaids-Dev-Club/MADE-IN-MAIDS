'use client'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import React from 'react'
import { QueryClientProvider } from 'react-query'

import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig } from 'wagmi'
import { queryClient } from '@/lib/react-query'
import { polygon } from '@wagmi/core/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
import { configureChains, createConfig } from '@wagmi/core'
import { config } from '@/lib/wagmi'

export const { chains, publicClient } = configureChains(
  [polygon],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()]
)

export const wagmiConfig = createConfig({
  publicClient,
})

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiConfig config={config}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
