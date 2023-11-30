'use client'

import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from '@wagmi/core/providers/public'
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

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
)

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
          <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
