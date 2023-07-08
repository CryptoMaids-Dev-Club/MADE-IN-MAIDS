'use client'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import React from 'react'
import { QueryClientProvider } from 'react-query'

import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig } from 'wagmi'
import { queryClient } from '@/lib/react-query'
import { chains, config } from '@/lib/wagmi'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <QueryClientProvider client={queryClient}>{mounted && children}</QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
