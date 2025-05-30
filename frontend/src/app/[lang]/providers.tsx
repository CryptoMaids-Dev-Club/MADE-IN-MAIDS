'use client'

import type React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { LanguageProvider } from '@/app/i18n/client'
import { ThemeProvider } from '@/components/theme-provider'
import { NETWORK, WALLET_CONNECT_ID } from '@/config/client'
import { RainbowKitProvider, connectorsForWallets, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { polygon, sepolia } from 'wagmi/chains'

const appName = 'MadeInMaids'
const projectId = WALLET_CONNECT_ID

const { wallets } = getDefaultWallets()
const connectors = connectorsForWallets(
  [
    ...wallets,
    {
      groupName: 'WalletConnect',
      wallets: [walletConnectWallet],
    },
  ],
  {
    appName,
    projectId,
  },
)

export const config = createConfig({
  chains: [NETWORK],
  ssr: true,
  connectors,
  transports: {
    [polygon.id]: http(),
    [sepolia.id]: http('https://sepolia.infura.io/v3/bdd42d36e9dd409c90f343c48530cc4c'),
  },
})

const queryClient = new QueryClient()

export const Providers = ({ lang, children }: { lang: string; children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <RainbowKitProvider theme={darkTheme()}>
            <LanguageProvider initialLanguage={lang}>{children}</LanguageProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
