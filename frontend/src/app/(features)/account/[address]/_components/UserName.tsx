'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import { useSaveUserInfo } from '@/app/(features)/account/[address]/_hooks/useSaveUserInfo'
import AutoForm from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import type { Address } from 'viem'

type UserNameProps = {
  targetAddress: Address
  userInfo: User
}

const createSchema = (userInfo: User) => {
  return z.object({
    name: z.string().default(userInfo.name),
  })
}

const UserName = ({ targetAddress, userInfo }: UserNameProps) => {
  const [editing, setEditing] = useState(false)

  const { address } = useAccount()
  const { saveUserInfo } = useSaveUserInfo(address ?? '0x0')

  const handleClose = async (newName: string) => {
    setEditing(false)
    if (userInfo.name === newName || address === undefined) return

    await saveUserInfo(newName, userInfo.iconUrl)
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
