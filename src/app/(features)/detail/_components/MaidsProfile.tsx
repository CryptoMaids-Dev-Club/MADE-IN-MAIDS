'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MaidProfile } from '@prisma/client'
import Image from 'next/image'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useSignMessage } from 'wagmi'
import updateMaidProfile from '@/app/api/maidsProfile/updateMaidProfile'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/lib/signature'
import { FormSchema, formSchema } from '../schema'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

type MaidsProfileProps = {
  profile: MaidProfile
  asset: AssetInfo
  owner: string
}

const MaidsProfile = ({ profile, asset, owner }: MaidsProfileProps) => {
  const [editing, setEditing] = useState(false)
  const [maidsProfile, setMaidsProfile] = useState<MaidProfile>(profile)
  const debounceProfile = useDebounce(maidsProfile, 500)

  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateMaidProfile({ ...debounceProfile, imageUrl: asset.image, address, signature: data })
        saveSignatureToLocalStorage(address, data)
        setEditing(false)
      } catch (e) {
        console.error(e)
      }
    },
  })

  const matches = useMediaQuery('(min-width: 560px)')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async () => {
    if (address === undefined) return

    const signature = getSignatureFromLocalStorage(address)

    if (signature) {
      await updateMaidProfile({ ...debounceProfile, imageUrl: asset.image, address, signature })
      setEditing(false)
    } else {
      signMessage()
    }
  }

  return (
    <>
      <Grid container>
        <Grid item>
          {editing ? (
            <TextField
              {...register('name', { required: true })}
              label='Name'
              defaultValue={profile.name}
              variant='standard'
              size='medium'
              onChange={(e) => setMaidsProfile({ ...debounceProfile, name: e.target.value })}
              error={'name' in errors}
              helperText={errors.name?.message}
              type='string'
              style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
            />
          ) : (
            <Typography component='span' sx={{ color: 'black', typography: { sm: 'h4', xs: 'h5' } }}>
              {debounceProfile.name ?? `CryptoMaids #${profile.id}`}
            </Typography>
          )}
        </Grid>
        {!editing && (
          <Grid item mt='5px'>
            <Link
              href={`https://opensea.io/assets/ethereum/0x5703a3245ff6fad37fa2a2500f0739d4f6a234e7/${profile.id}`}
              underline='none'>
              <Image src='/images/Logomark-Blue.png' alt='logo' height='35' width='35' />
            </Link>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ mb: '10px' }} />
      <Typography component='span' sx={{ color: 'black', typography: { sm: 'h4', xs: 'h5' } }}>
        Character
        <br />
      </Typography>
      {editing ? (
        <TextField
          {...register('character', { required: true })}
          label='Character'
          multiline
          defaultValue={profile.character}
          variant='standard'
          size='medium'
          onChange={(e) => setMaidsProfile({ ...debounceProfile, character: e.target.value })}
          error={'character' in errors}
          helperText={errors.character?.message}
          type='string'
          style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
        />
      ) : (
        <Typography variant='h5' component='span' sx={{ color: 'black', whiteSpace: 'pre-line' }}>
          {debounceProfile.character ?? '???'}
        </Typography>
      )}
      <Divider sx={{ mb: '10px', mt: '10px' }} />
      <Typography component='span' sx={{ color: 'black', typography: { sm: 'h4', xs: 'h5' } }}>
        Description
        <br />
      </Typography>
      {editing ? (
        <TextField
          {...register('description', { required: true })}
          label='Description'
          multiline
          defaultValue={profile.description}
          variant='standard'
          size='medium'
          onChange={(e) => setMaidsProfile({ ...debounceProfile, description: e.target.value })}
          error={'description' in errors}
          helperText={errors.description?.message}
          type='string'
          style={{ width: matches ? '530px' : window.innerWidth * 0.68 }}
        />
      ) : (
        <Typography variant='h5' component='span' sx={{ color: 'black', whiteSpace: 'pre-line' }}>
          {debounceProfile.description ?? '???'}
        </Typography>
      )}
      <Divider sx={{ mt: '10px' }} />
      {address?.toString() === owner && !editing && (
        <Button onClick={() => setEditing(true)} sx={{ fontSize: '30px', border: '1px solid', mt: '20px' }} fullWidth>
          Edit
        </Button>
      )}

      {address?.toString() === owner && editing && (
        <Button onClick={handleSubmit(onSubmit)} sx={{ fontSize: '30px', border: '1px solid', mt: '20px' }} fullWidth>
          Save
        </Button>
      )}
      <br />
      <br />
      <NextLink href={`/detail/voting/${profile.id}`}>
        <Typography variant='h5' component='span' sx={{ color: 'black' }}>
          Go to Vote
        </Typography>
      </NextLink>
    </>
  )
}

export default MaidsProfile
