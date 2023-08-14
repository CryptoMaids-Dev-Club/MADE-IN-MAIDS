'use client'

import { useUser } from '@/app/(features)/account/_hooks/useUser'
import Avatar from '@mui/material/Avatar'
import NextLink from 'next/link'
import { useAccount } from 'wagmi'

export const ProfileIcon = () => {
  const { address } = useAccount()
  const { userInfo, isLoading } = useUser(address ?? '')

  if (isLoading || address === undefined) return <Avatar src='' sx={{ width: 40, height: 40 }} />

  return (
    <NextLink href={`/account/${address.toLowerCase()}`}>
      <Avatar src={userInfo ? userInfo.iconUrl : ''} sx={{ width: 40, height: 40 }} />
    </NextLink>
  )
}

export default ProfileIcon
