'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { FaPen } from 'react-icons/fa'
import { useAccount, useSignMessage } from 'wagmi'
import { z } from 'zod'
import updateUserInfo from '@/app/api/user/updateUserInfo'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
type FormSchema = z.infer<typeof schema>

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [editing, setEditing] = useState(false)
  const [userName, setUserName] = useState(userInfo.name)
  const { toast } = useToast()

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateUserInfo({ name: userName, address, iconUrl: '', signature: data })
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
    // ToDo: Fix not called when click
    setEditing(false)
    if (userInfo.name === userName || address === undefined) return

    const signature = getSignatureFromLocalStorage(address)
    if (signature) {
      await updateUserInfo({ name: userName, address, iconUrl: '', signature })
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
          {userName}
          {
            <button
              className='ml-2 bg-black'
              onClick={() => setEditing(true)}
              disabled={address?.toLocaleLowerCase() !== targetAddress}>
              <FaPen className='hover:opacity-50' color='white' />
            </button>
          }
        </Typography>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleClose)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={(event) => setUserName(event.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type='submit'>
              Update
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default UserName
