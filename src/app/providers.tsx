'use client'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import { HelmetProvider } from 'react-helmet-async'

import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig } from 'wagmi'
import { Box, Button, Typography } from '@mui/material'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { queryClient } from '@/lib/react-query'
import { chains, config } from '@/lib/wagmi'
import { CircleSpinnerOverlay } from 'react-spinner-overlay'

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <Box sx={{ height: '100%', width: '100%', bgcolor: 'black' }}>
    <Typography ml='7px' sx={{ color: 'white' }}>
      Ooops, something went wrong. Please refresh.
    </Typography>
    <Button className='mt-4' onClick={resetErrorBoundary}>
      Refresh
    </Button>
  </Box>
)

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <React.Suspense fallback={<CircleSpinnerOverlay />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <QueryClientProvider client={queryClient}>{mounted && children}</QueryClientProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default Providers

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
