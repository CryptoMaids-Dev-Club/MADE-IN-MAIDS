'use client'

import { MaidProfile } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import useProfileForm, { SubmitHandler } from '@/app/(features)/detail/_hooks/useProfileForm'
import useUpdateProfile from '@/app/(features)/detail/_hooks/useUpdateProfile'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

type MaidsProfileProps = {
  profile: MaidProfile
  asset: AssetInfo
  owner: string
}

const MaidsProfile = ({ profile, asset, owner }: MaidsProfileProps) => {
  const { editing, isOwner, toggleEditing, maidsProfile, updateProfile } = useUpdateProfile(profile, asset, owner)

  const form = useProfileForm(profile)
  const handleValid: SubmitHandler = (data) => {
    updateProfile({ ...maidsProfile, ...data })
  }

  return (
    <div className='flex flex-col gap-6'>
      {editing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleValid)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='character'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {isOwner && (
              <Button type='submit' className='w-full'>
                Save
              </Button>
            )}
          </form>
        </Form>
      ) : (
        <>
          <div className='flex flex-row'>
            <Typography variant='h2'>{maidsProfile.name ?? `CryptoMaids #${profile.id}`}</Typography>
            <a
              className='mx-2'
              href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${profile.id}`}>
              <Image src='/images/Logomark-Blue.png' alt='logo' height='35' width='35' />
            </a>
          </div>

          <div>
            <Typography variant='h2'>Character</Typography>
            <Typography variant='h4'>{maidsProfile.character ?? '???'}</Typography>
          </div>

          <div>
            <Typography variant='h2'>Description</Typography>
            <Typography variant='h5'>{maidsProfile.description ?? '???'}</Typography>
          </div>

          {isOwner && (
            <Button onClick={() => toggleEditing()} className='w-full'>
              Edit
            </Button>
          )}
        </>
      )}

      <Link href={`/detail/voting/${profile.id}`}>
        <Typography variant='h3'>Go to Vote</Typography>
      </Link>
    </div>
  )
}

export default MaidsProfile
