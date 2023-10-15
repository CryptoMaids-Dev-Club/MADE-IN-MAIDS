'use client'

import { Suspense } from 'react'
import Avatar from '@mui/material/Avatar'
import NextLink from 'next/link'
import { useAccount } from 'wagmi'
import { useUser } from '@/hooks/useUser'

export const ProfileIcon = () => {
  const { address } = useAccount()
  const { userInfo } = useUser(address ?? '')

  return (
    <Suspense fallback={<Avatar src='' sx={{ width: 40, height: 40 }} />}>
      <NextLink href={`/account/${address?.toLowerCase()}`}>
        <Avatar src={userInfo ? userInfo.iconUrl : ''} sx={{ width: 40, height: 40 }} />
      </NextLink>
    </Suspense>
  )
}

export default ProfileIcon
