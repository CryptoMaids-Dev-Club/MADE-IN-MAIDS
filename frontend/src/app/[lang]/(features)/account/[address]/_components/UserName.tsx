'use client'

import { useSaveUserInfo } from '@/app/[lang]/(features)/account/[address]/_hooks/useSaveUserInfo'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { User } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import * as v from 'valibot'

type UserNameProps = {
  targetAddress: Address
  userInfo: User
}

const schema = v.object({
  name: v.string(),
})

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [editing, setEditing] = useState(false)

  const { address } = useAccount()
  const { saveUserInfo } = useSaveUserInfo(address ?? '0x0')

  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: userInfo.name,
    },
  })

  const handleClose = async (newName: string) => {
    setEditing(false)
    if (userInfo.name === newName || address === undefined) return
    console.log('newName:', newName)

    await saveUserInfo(newName, userInfo.iconUrl)
  }

  return (
    <div>
      {!editing ? (
        <Typography className='w-auto' variant='h3'>
          {userInfo.name}
          {
            <button
              type='button'
              className='ml-2 bg-black'
              onClick={() => setEditing(true)}
              disabled={address?.toLocaleLowerCase() !== targetAddress}
            >
              <Pencil className='hover:opacity-50' color='white' />
            </button>
          }
        </Typography>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => handleClose(data.name))} className='mt-2 space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
