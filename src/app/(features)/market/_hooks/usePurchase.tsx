import { useState, useEffect } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { MarketItemInfo } from '@/app/api/marketItems/marketItem'
import { MARKET_PROXY_CONTRACT_ADDRESS, maidsContractConfig, marketContractConfig } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'

type usePurchaseProps = {
  item: MarketItemInfo
  amount: number
  differentAddress: string
}

export const usePurchase = ({ item, amount, differentAddress }: usePurchaseProps) => {
  const [isActive, setIsActive] = useState(false)
  const [approved, setApproved] = useState(false)
  const { address } = useAccount()
  const { allowance, refetch } = useAllowance(address ?? `0x${''}`, MARKET_PROXY_CONTRACT_ADDRESS)
  const { approve, approveTx } = useApprove(
    maidsContractConfig.address,
    address ?? `0x${''}`,
    MARKET_PROXY_CONTRACT_ADDRESS
  )
  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  useEffect(() => {
    const checkActive = () => {
      const active = item.supply > 0

      if (address != null && active) {
        setIsActive(active)
      }
    }
    checkActive()
  }, [address, item.supply])

  useEffect(() => {
    const totalPrice = Number(item.price) * amount
    setApproved((allowance ?? 0) >= totalPrice)
  }, [allowance, amount, item.price])

  const { config: buyItemConfig } = usePrepareContractWrite({
    ...marketContractConfig,
    functionName: 'buyItem',
    args: differentAddress !== '' ? [differentAddress, item.id, amount] : [address, item.id, amount],
    enabled: approved,
  })
  const buyItem = useContractWrite(buyItemConfig)

  const buyItemTx = useWaitForTransaction({
    hash: buyItem.data?.hash,
    onSuccess() {
      openSnackbar()
      refetch()
    },
  })

  const buyItemOrApprove = () => {
    try {
      if (approved) {
        buyItem.write?.()
      } else {
        approve.write?.()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    buyItemOrApprove,
    isActive,
    approved,
    isLoading: approve.isLoading || buyItem.isLoading || approveTx.isLoading || buyItemTx.isLoading,
    open,
    Snackbar,
  }
}
