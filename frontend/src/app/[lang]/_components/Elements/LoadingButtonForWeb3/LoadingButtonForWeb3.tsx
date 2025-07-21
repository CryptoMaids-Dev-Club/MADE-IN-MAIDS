'use client'

import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useSwitchChain } from 'wagmi'
import type { ButtonProps } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'

export type ButtonLoadingProps = ButtonProps & {
  loading: boolean
}

const LoadingButtonForWeb3 = ({ loading, ...props }: ButtonLoadingProps) => {
  const { chain, isConnected } = useAccount()
  const { chains, isPending, switchChain } = useSwitchChain()
  const { openConnectModal } = useConnectModal()

  if (!isConnected) {
    return (
      <LoadingButton className={props.className} loading={isPending} onClick={openConnectModal}>
        Connect Wallet
      </LoadingButton>
    )
  }

  if (chain === undefined) {
    return (
      <LoadingButton
        className={props.className}
        loading={isPending}
        onClick={() => switchChain({ chainId: chains[0].id })}
      >
        Switch to {chains[0].name} Network
      </LoadingButton>
    )
  }

  return (
    <LoadingButton {...props} loading={loading}>
      {props.children}
    </LoadingButton>
  )
}

export default LoadingButtonForWeb3
