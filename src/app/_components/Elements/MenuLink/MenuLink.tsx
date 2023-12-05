'use client'

import { Typography } from '@/components/ui/typography'

type MenuLinkProps = {
  text: string
  link: string
}
export const MenuLink = ({ text, link }: MenuLinkProps) => (
  <Typography className='mx-2 mt-1' variant='h4' onClick={() => window.open(link, '_blank')}>
    {text}
  </Typography>
)

export default MenuLink
