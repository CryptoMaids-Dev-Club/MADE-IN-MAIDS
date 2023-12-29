'use client'

import { MaidProfile } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Address } from 'viem'
import { z } from 'zod'
import useUpdateProfile from '@/app/(features)/detail/_hooks/useUpdateProfile'
import AutoForm from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import type { AssetInfo } from '@/server/asset'

type MaidsProfileProps = {
  profile: MaidProfile
  asset: AssetInfo
  owner: Address
}

const createSchema = (profile: MaidProfile) => {
  return z.object({
    name: z.string().min(1).default(profile.name),
    character: z.string().min(1).default(profile.character),
    description: z.string().min(1).default(profile.description),
  })
}

const MaidsProfile = ({ profile, asset, owner }: MaidsProfileProps) => {
  const { editing, isOwner, maidsProfile, toggleEditing, updateProfile } = useUpdateProfile(profile, asset, owner)

  const handleSubmit = (data: { name: string; character: string; description: string }) => {
    updateProfile({ ...maidsProfile, ...data })
  }

  return (
    <div className='flex flex-col gap-6'>
      {editing ? (
        <AutoForm
          formSchema={createSchema(profile)}
          onSubmit={(data) => handleSubmit(data)}
          fieldConfig={{
            name: {
              inputProps: {
                placeholder: 'Name',
              },
            },
            character: {
              inputProps: {
                placeholder: 'Character',
              },
            },
            description: {
              inputProps: {
                placeholder: 'Description',
              },
            },
          }}>
          {isOwner && (
            <Button type='submit' className='w-full'>
              Save
            </Button>
          )}
        </AutoForm>
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
