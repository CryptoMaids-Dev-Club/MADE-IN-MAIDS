'use client'

import { UserRound } from 'lucide-react'
import NextLink from 'next/link'
import { Address } from 'viem'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/hooks/useUser'

type ProfileIconProps = {
  address: Address
}

export const ProfileIcon = ({ address }: ProfileIconProps) => {
  const { userInfo } = useUser(address)

  return (
    <NextLink href={`/account/${address?.toLowerCase()}`}>
      <Avatar>
        <AvatarImage src={userInfo.iconUrl} />
        <AvatarFallback>
          <UserRound />
        </AvatarFallback>
      </Avatar>
    </NextLink>
  )
}

export default ProfileIcon
