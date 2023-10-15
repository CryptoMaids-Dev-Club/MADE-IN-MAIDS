'use client'

import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import { TwitterAlert } from '@/app/_components/Elements/TwitterAlert'
import { MARKET_PROXY_CONTRACT_ADDRESS, maidsContractConfig, marketContractConfig } from '@/config/client'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
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

  const handleClick = () => {
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

  return (
    <>
      <LoadingButton
        fullWidth
        loading={approve.isLoading || buyItem.isLoading || approveTx.isLoading || buyItemTx.isLoading}
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
