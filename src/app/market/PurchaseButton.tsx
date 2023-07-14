'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import { useEffect, useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { MARKET_PROXY_CONTRACT_ADDRESS, maidsContractConfig, marketContractConfig } from '@/config'
import { useAllowance } from '@/hooks/useAllowance'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { TwitterIcon, TwitterShareButton } from 'react-share'
import { MarketItemInfo } from './types'

type PurchaseButtonProps = {
  item: MarketItemInfo
  amount: number
  differentAddress: string
}

const SuccessAlert = ({ title, url }: { title: string; url: string }) => (
  <Grid container>
    <Grid item>
      <Typography variant='h5'>Successfully bought! Share</Typography>
    </Grid>
    <Grid item>
      <TwitterShareButton title={title} url={url} hashtags={['CryptoMaids']}>
        <TwitterIcon size={34} round />
      </TwitterShareButton>
    </Grid>
  </Grid>
)

const PurchaseButton = ({ item, amount, differentAddress }: PurchaseButtonProps) => {
  const [isActive, setIsActive] = useState(false)
  const [approved, setApproved] = useState(false)
  const { address } = useAccount()
  const { allowance, refetch } = useAllowance(address, MARKET_PROXY_CONTRACT_ADDRESS)
  const [open, setOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

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
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    onSuccess() {
      setOpen(true)
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
      console.log(e)
    }
  }

  return (
    <>
      <LoadingButton
        fullWidth
        loading={isLoadingApprove || isLoadingBuyItem || approveTx.isLoading || buyItemTx.isLoading}
        disabled={!isActive}
        onClick={handleClick}
        sx={{ border: '1px solid gray', color: 'FF4264', fontSize: '20px' }}>
        {approved ? `Purchase for ${Number(item.price) * amount} $MAIDS` : `Approve $MAIDS`}
      </LoadingButton>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={10000}
        onClose={handleClose}>
        <Alert icon={false} onClose={handleClose} variant='filled' severity='success' sx={{ width: '100%' }}>
          <SuccessAlert
            title={item.name}
            url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/item/${item.id}`}
          />
        </Alert>
      </Snackbar>
    </>
  )
}

export default PurchaseButton
