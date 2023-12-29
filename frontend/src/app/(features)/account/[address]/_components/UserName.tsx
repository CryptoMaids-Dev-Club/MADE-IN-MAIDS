'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useAccount, useSignMessage } from 'wagmi'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { useUpdateUser } from '@/hooks/useUser'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/utils/signature'

type UserNameProps = {
  targetAddress: string
  userInfo: User
}

const createSchema = (userInfo: User) => {
  return z.object({
    name: z.string().default(userInfo.name),
  })
}

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [editing, setEditing] = useState(false)
  const { toast } = useToast()

  const { address } = useAccount()
  const updateUserInfo = useUpdateUser(address ?? '0x0')
  const { signMessageAsync } = useSignMessage({
    message: 'Update Profile',
  })

  const handleClose = async (newName: string) => {
    setEditing(false)
    if (userInfo.name === newName || address === undefined) return

    const signature = getSignatureFromLocalStorage(address)
    if (signature) {
      await updateUserInfo.mutate({ name: newName, address, iconUrl: '', signature })
      toast({
        title: 'Successfully updated!',
        duration: 3000,
      })
    } else {
      signMessageAsync().then(async (data) => {
        if (address === undefined) return
        try {
          await updateUserInfo.mutate({ name: newName, address, iconUrl: '', signature: data })
          saveSignatureToLocalStorage(address, data)
          toast({
            title: 'Successfully updated!',
            duration: 3000,
          })
        } catch (e) {
          console.error(e)
        }
      })
    }
  }

  return (
    <div>
      {!editing ? (
        <Typography className='w-auto' variant='h3'>
          {userInfo.name}
          {
            <button
              className='ml-2 bg-black'
              onClick={() => setEditing(true)}
              disabled={address?.toLocaleLowerCase() !== targetAddress}>
              <Pencil className='hover:opacity-50' color='white' />
            </button>
          }
        </Typography>
      ) : (
        <AutoForm
          formSchema={createSchema(userInfo)}
          fieldConfig={{
            name: {
              inputProps: {
                type: 'text',
                placeholder: 'UserName',
              },
            },
          }}
          onSubmit={(data) => handleClose(data.name)}>
          <Button className='w-full' type='submit'>
            Update
          </Button>
        </AutoForm>
      )}
    </div>
  )
}

export default UserName
