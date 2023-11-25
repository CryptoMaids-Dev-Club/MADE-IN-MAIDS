'use client'

import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MaidProfile } from '@prisma/client'
import Image from 'next/image'
import useProfileForm, {
  ProfileForm,
  SubmitErrorHandler,
  SubmitHandler,
} from '@/app/(features)/detail/_hooks/useProfileForm'
import useUpdateProfile from '@/app/(features)/detail/_hooks/useUpdateProfile'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { Typography } from '@/components/ui/Typography'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

type MaidsProfileProps = {
  profile: MaidProfile
  asset: AssetInfo
  owner: string
}

const MaidsProfile = ({ profile, asset, owner }: MaidsProfileProps) => {
  const { editing, isOwner, toggleEditing, maidsProfile, changeProfile, updateProfile } = useUpdateProfile(
    profile,
    asset,
    owner
  )

  const { handleSubmit, errors, fieldValues }: ProfileForm = useProfileForm(profile)
  const handleValid: SubmitHandler = () => {
    updateProfile()
  }
  const handleInvalid: SubmitErrorHandler = () => console.log('handleInvalid')

  const matches = useMediaQuery('(min-width: 560px)')

  return (
    <>
      <div>
        {editing ? (
          <TextField
            {...fieldValues.name}
            label='Name'
            defaultValue={profile.name}
            variant='standard'
            size='medium'
            onChange={(e) => changeProfile({ ...maidsProfile, name: e.target.value })}
            error={'name' in errors}
            helperText={errors.name?.message}
            type='string'
            style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
          />
        ) : (
          <>
            <Typography variant='h2'>{maidsProfile.name ?? `CryptoMaids #${profile.id}`}</Typography>
            <a href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${profile.id}`}>
              <Image src='/images/Logomark-Blue.png' alt='logo' height='35' width='35' />
            </a>
          </>
        )}
      </div>

      <Divider />
      <Typography>
        Character
        <br />
      </Typography>
      {editing ? (
        <TextField
          {...fieldValues.character}
          label='Character'
          multiline
          defaultValue={profile.character}
          variant='standard'
          size='medium'
          onChange={(e) => changeProfile({ ...maidsProfile, character: e.target.value })}
          error={'character' in errors}
          helperText={errors.character?.message}
          type='string'
          style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
        />
      ) : (
        <Typography>{maidsProfile.character ?? '???'}</Typography>
      )}
      <Divider />
      <Typography>
        Description
        <br />
      </Typography>
      {editing ? (
        <TextField
          {...fieldValues.description}
          label='Description'
          multiline
          defaultValue={profile.description}
          variant='standard'
          size='medium'
          onChange={(e) => changeProfile({ ...maidsProfile, description: e.target.value })}
          error={'description' in errors}
          helperText={errors.description?.message}
          type='string'
          style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
        />
      ) : (
        <Typography variant='h5'>{maidsProfile.description ?? '???'}</Typography>
      )}
      <Divider />
      {isOwner && !editing && <Button onClick={() => toggleEditing()}>Edit</Button>}

      {isOwner && editing && <Button onClick={() => handleSubmit(handleValid, handleInvalid)}>Save</Button>}
      <br />
      <br />
      <Link href={`/detail/voting/${profile.id}`}>
        <Typography variant='h4'>Go to Vote</Typography>
      </Link>
    </>
  )
}

export default MaidsProfile
