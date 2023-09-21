'use client'

import Alert from '@mui/material/Alert'
import MuiSnackbar, { SnackbarProps as MuiSnackBarProps } from '@mui/material/Snackbar'
import { useState } from 'react'

type SnackbarProps = Omit<MuiSnackBarProps, 'children'> & {
  children: React.ReactNode
}

export const useSuccessSnackbar = () => {
  const [isOpen, setOpen] = useState(false)

  const open = () => {
    setOpen(true)
  }

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const Snackbar = (props: SnackbarProps) => {
    const { children, sx, ...snackBarProps } = props

    return (
      <MuiSnackbar open={isOpen} onClose={close} {...snackBarProps} sx={sx}>
        <Alert icon={false} variant='filled' severity='success' sx={{ width: '100%' }}>
          {children}
        </Alert>
      </MuiSnackbar>
    )
  }

  return { open, close, Snackbar }
}

export default useSuccessSnackbar
