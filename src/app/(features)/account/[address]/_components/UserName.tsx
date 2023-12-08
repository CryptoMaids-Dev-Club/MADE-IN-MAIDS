'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useAccount, useSignMessage } from 'wagmi'
import { z } from 'zod'
import updateUserInfo from '@/app/api/user/updateUserInfo'
import AutoForm from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/lib/signature'

type UserNameProps = {
  targetAddress: string
  userInfo: User
}

const schema = z.object({
  name: z.string().min(1),
})

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [editing, setEditing] = useState(false)
  const [userName, setUserName] = useState<z.infer<typeof schema>>({ name: userInfo.name })
  const { toast } = useToast()

  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateUserInfo({ name: userName.name, address, iconUrl: '', signature: data })
        saveSignatureToLocalStorage(address, data)
        toast({
          title: 'Successfully updated!',
          description: 'Please refresh the page.',
          duration: 3000,
        })
      } catch (e) {
        console.error(e)
      }
    },
  })

  const handleClose = async () => {
    setEditing(false)
    if (userInfo.name === userName.name || address === undefined) return

    const signature = getSignatureFromLocalStorage(address)
    if (signature) {
      await updateUserInfo({ name: userName.name, address, iconUrl: '', signature })
      toast({
        title: 'Successfully updated!',
        description: 'Please refresh the page.',
        duration: 3000,
      })
    } else {
      signMessage()
    }
  }

  return (
    <div>
      {!editing ? (
        <Typography className='w-auto' variant='h3'>
          {userName.name}
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
          formSchema={schema}
          fieldConfig={{
            name: {
              inputProps: {
                type: 'text',
                placeholder: 'UserName',
              },
            },
          }}
          onSubmit={() => handleClose()}
          values={userName}
          onValuesChange={(values) => setUserName({ name: values.name ?? '' })}>
          <Button className='w-full' type='submit'>
            Update
          </Button>
        </AutoForm>
      )}
    </div>
  )
}

export default UserName
