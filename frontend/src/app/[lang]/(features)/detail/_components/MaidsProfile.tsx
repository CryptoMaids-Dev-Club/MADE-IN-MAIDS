'use client'

import useUpdateProfile from '@/app/[lang]/(features)/detail/_hooks/useUpdateProfile'
import { useLanguage } from '@/app/i18n/client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import type { AssetInfo } from '@/server/asset'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { MaidProfile } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import type { Address } from 'viem'
import * as v from 'valibot'

type MaidsProfileProps = {
  profile: MaidProfile
  asset: AssetInfo
  owner: Address
}

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  character: v.pipe(v.string(), v.minLength(1)),
  description: v.pipe(v.string(), v.minLength(1)),
})

const MaidsProfile = ({ profile, asset, owner }: MaidsProfileProps) => {
  const { language } = useLanguage()

  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: profile.name,
      character: profile.character,
      description: profile.description,
    },
  })

  const { editing, updating, isOwner, maidsProfile, toggleEditing, updateProfile } = useUpdateProfile(
    profile,
    asset,
    owner,
  )

  const onSubmit = (data: { name: string; character: string; description: string }) => {
    updateProfile({ ...maidsProfile, ...data })
  }

  return (
    <div className='flex flex-col gap-6'>
      {editing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
              <LoadingButton loading={updating} type='submit' className='w-full'>
                Save
              </LoadingButton>
            )}
          </form>
        </Form>
      ) : (
        <>
          <div className='flex flex-row'>
            <Typography variant='h2'>{maidsProfile.name ?? `CryptoMaids #${profile.id}`}</Typography>
            <a
              className='mx-2'
              href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${profile.id}`}
            >
              <Image src='/images/common/Logomark-Blue.png' alt='logo' height='35' width='35' />
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

      <Link href={`/${language}/detail/voting/${profile.id}`}>
        <Typography variant='h3'>Go to Vote</Typography>
      </Link>
    </div>
  )
}

export const MaidsProfileSkeleton = () => (
  <div className='flex flex-col gap-6'>
    <div className='flex flex-row'>
      <Skeleton className='h-12 w-full' />
    </div>

    <div>
      <Typography variant='h2'>Character</Typography>
      <Skeleton className='h-8 w-full' />
    </div>

    <div>
      <Typography variant='h2'>Description</Typography>
      <Skeleton className='h-16 w-full' />
    </div>
  </div>
)

export default MaidsProfile
