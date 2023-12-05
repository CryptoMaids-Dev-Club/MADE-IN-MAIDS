'use client'

import NextLink from 'next/link'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/hooks/useUser'

type ProfileIconProps = {
  address: string
}

export const ProfileIcon = ({ address }: ProfileIconProps) => {
  const { userInfo } = useUser(address)

  return (
    <NextLink href={`/account/${address?.toLowerCase()}`}>
      <Avatar>
        <AvatarImage src={userInfo.iconUrl} />
      </Avatar>
    </NextLink>
  )
}

export default ProfileIcon
