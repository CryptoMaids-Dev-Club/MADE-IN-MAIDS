'use client'

import Avatar from '@mui/material/Avatar'
import NextLink from 'next/link'
import { useUser } from '@/hooks/useUser'

type ProfileIconProps = {
  address: string
}

export const ProfileIcon = ({ address }: ProfileIconProps) => {
  const { userInfo } = useUser(address)

  return (
    <NextLink href={`/account/${address?.toLowerCase()}`}>
      <Avatar src={userInfo.iconUrl} sx={{ width: 40, height: 40 }} />
    </NextLink>
  )
}

export default ProfileIcon
