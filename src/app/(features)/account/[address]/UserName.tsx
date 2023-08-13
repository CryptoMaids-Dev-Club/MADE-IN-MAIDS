import Typography from '@mui/material/Typography'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import updateUserInfo from '@/app/api/user/[address]/updateUserInfo'
import { User } from '@prisma/client'
import { useAccount, useSignMessage } from 'wagmi'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type UserNameProps = {
  targetAddress: string
  userInfo: User
}

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const editing = Boolean(anchorEl)

  const [userName, setUserName] = useState(userInfo.name)
  const [open, setOpen] = useState(false)

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateUserInfo({ name: userName, address, iconUrl: '', signature: data })
        setOpen(true)
      } catch (e) {
        console.error(e)
      }
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    if (userInfo.name === userName) return
    signMessage()
  }

  return (
    <div>
      {!editing ? (
        <Typography variant='h4' sx={{ color: 'white' }}>
          {userName}
          {address && address === targetAddress && (
            <IconButton onClick={handleClick} sx={{ color: 'white' }}>
              <ModeEditIcon />
            </IconButton>
          )}
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
            sx={{ input: { color: 'white' } }}
          />
        </FormControl>
      )}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleCloseAlert}>
        <Alert icon={false} onClose={handleCloseAlert} variant='filled' severity='success' sx={{ width: '100%' }}>
          Successfully updated! Please refresh the page.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default UserName
