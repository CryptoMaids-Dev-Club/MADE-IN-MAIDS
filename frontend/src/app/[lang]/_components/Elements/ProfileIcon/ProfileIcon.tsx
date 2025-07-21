'use client'

import { UserRound } from 'lucide-react'
import Link from 'next/link'
import type { Address } from 'viem'
import { useLanguage } from '@/app/i18n/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/hooks/useUser'

type ProfileIconProps = {
  address: Address
}

export const ProfileIcon = ({ address }: ProfileIconProps) => {
  const { language } = useLanguage()
  const { userInfo } = useUser(address)

  return (
    <Link href={`/${language}/account/${address?.toLowerCase()}`}>
      <Avatar>
        <AvatarImage src={userInfo.iconUrl} />
        <AvatarFallback>
          <UserRound />
        </AvatarFallback>
      </Avatar>
    </Link>
  )
}

export default ProfileIcon
