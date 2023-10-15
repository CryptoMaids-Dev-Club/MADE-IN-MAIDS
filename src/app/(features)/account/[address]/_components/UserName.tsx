'use client'

import { useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import { User } from '@prisma/client'
import { useAccount, useSignMessage } from 'wagmi'
import { useSuccessSnackbar } from '@/app/_components/Elements/SnackBar'
import updateUserInfo from '@/app/api/user/updateUserInfo'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/lib/signature'

type UserNameProps = {
  targetAddress: string
  userInfo: User
}

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const editing = Boolean(anchorEl)

  const [userName, setUserName] = useState(userInfo.name)

  const { open: openSnackbar, Snackbar } = useSuccessSnackbar()

  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateUserInfo({ name: userName, address, iconUrl: '', signature: data })
        saveSignatureToLocalStorage(address, data)
        openSnackbar()
      } catch (e) {
        console.error(e)
      }
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async () => {
    setAnchorEl(null)
    if (userInfo.name === userName || address === undefined) return

    const signature = getSignatureFromLocalStorage(address)
    if (signature) {
      await updateUserInfo({ name: userName, address, iconUrl: '', signature })
      openSnackbar()
    } else {
      signMessage()
    }
  }

  return (
    <div>
      {!editing ? (
        <Typography variant='h4'>
          {userName}
          {
            <IconButton onClick={handleClick} disabled={address?.toLocaleLowerCase() !== targetAddress}>
              <ModeEditIcon />
            </IconButton>
          }
        </Typography>
      ) : (
        <FormControl sx={{ m: 1, width: '20ch' }} variant='outlined'>
          <OutlinedInput
            id='outlined-adornment-password'
            type='text'
            defaultValue={userName}
            onChange={(e) => setUserName(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={handleClose} edge='end' sx={{ color: 'hotpink' }}>
                  Save
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
        Successfully updated! Please refresh the page.
      </Snackbar>
    </div>
  )
}

export default UserName
