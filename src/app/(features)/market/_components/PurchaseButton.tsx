'use client'

import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { TwitterAlert } from '@/app/_components/Elements/TwitterAlert'
import { MARKET_PROXY_CONTRACT_ADDRESS, maidsContractConfig, marketContractConfig } from '@/config'
import { useAllowance } from '@/hooks/useAllowance'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

type PurchaseButtonProps = {
  item: MarketItemInfo
  amount: number
  differentAddress: string
}

const PurchaseButton = ({ item, amount, differentAddress }: PurchaseButtonProps) => {
  const [isActive, setIsActive] = useState(false)
  const [approved, setApproved] = useState(false)
  const { address } = useAccount()
  const { allowance, refetch } = useAllowance(address, MARKET_PROXY_CONTRACT_ADDRESS)
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
  const { data: buyItemData, isLoading: isLoadingApprove, write: buyItem } = useContractWrite(buyItemConfig)

  const { config: approveConfig } = usePrepareContractWrite({
    ...maidsContractConfig,
    functionName: 'approve',
    args: [MARKET_PROXY_CONTRACT_ADDRESS, '0xffffffffffffffffffffffffffffffffffffffffffffffffff'],
    enabled: address !== undefined,
  })
  const { data: approveData, isLoading: isLoadingBuyItem, write: approve } = useContractWrite(approveConfig)

  const approveTx = useWaitForTransaction({
    hash: approveData?.hash,
  })

  const buyItemTx = useWaitForTransaction({
    hash: buyItemData?.hash,
    onSuccess() {
      openSnackbar()
    },
  })

  useEffect(() => {
    const refetchAllowance = async () => {
      await refetch()
    }
    void refetchAllowance()
  }, [approveTx.status, buyItemTx.status, refetch])

  const handleClick = () => {
    try {
      if (approved) {
        buyItem?.()
      } else {
        approve?.()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <LoadingButton
        fullWidth
        loading={isLoadingApprove || isLoadingBuyItem || approveTx.isLoading || buyItemTx.isLoading}
        disabled={!isActive}
        onClick={handleClick}
        sx={{ border: '1px solid gray', fontSize: '20px' }}>
        {approved ? `Purchase for ${Number(item.price) * amount} $MAIDS` : `Approve $MAIDS`}
      </LoadingButton>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={10000}>
        <TwitterAlert
          message='Successfully bought! Share'
          title={`Successfully bought ${item.name}!`}
          url={`https://made-in-maids.vercel.app/market/item/${item.id}`}
          hashtags={['CryptoMaids']}
        />
      </Snackbar>
    </>
  )
}

export default PurchaseButton
