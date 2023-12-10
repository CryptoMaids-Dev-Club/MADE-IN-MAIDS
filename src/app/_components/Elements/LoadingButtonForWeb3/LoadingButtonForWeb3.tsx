import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ButtonProps } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'

export type ButtonLoadingProps = ButtonProps & {
  loading: boolean
}

const LoadingButtonForWeb3 = ({ loading, ...props }: ButtonLoadingProps) => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const { chains, isLoading, switchNetwork } = useSwitchNetwork()
  const { openConnectModal } = useConnectModal()

  if (!isConnected) {
    return (
      <LoadingButton {...props} loading={isLoading} onClick={openConnectModal}>
        Connect Wallet
      </LoadingButton>
    )
  }

  if (chain && chain.id !== chains[0].id) {
    return (
      <LoadingButton {...props} loading={isLoading} onClick={() => switchNetwork?.(chains[0].id)}>
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
