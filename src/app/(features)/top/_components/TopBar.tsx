'use client'

import { Suspense } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileIcon } from '@/app/_components/Elements/ProfileIcon'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu'
import { Skeleton } from '@/components/ui/Skeleton'

// const SideDrawer = dynamic(() => import('@/app/_components/Elements/Drawer').then((mod) => mod.SideDrawer), {
//   ssr: false,
// })

const Balance = dynamic(() => import('@/app/_components/Elements/Balance').then((mod) => mod.Balance), {
  ssr: false,
})

export const TopBar = () => {
  const linkNames = ['Discord', 'Twitter', 'WebSite', 'TACHIYOMI', 'OS', 'SHOOTING', 'STAKING']
  const linkUrls = [
    'https://discord.gg/cryptomaids',
    'https://twitter.com/CryptoMaids',
    'https://cryptomaids.tokyo/home',
    'https://cryptomaids.tokyo/tachiyomi',
    'https://opensea.io/collection/cryptomaids',
    'https://cryptomaids-shooting.netlify.app/',
    'https://made-in-maids.cryptomaids.tokyo/',
  ]

  // const [open, setOpen] = useState(false)

  // const handleDrawerOpen = () => {
  //   setOpen(true)
  // }

  // const handleDrawerClose = () => {
  //   setOpen(false)
  // }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Image src='/images/logo_set.png' width='160' height='48' alt='logo' style={{ marginTop: '10px' }} />
          </Link>
        </NavigationMenuItem>
        {linkNames.map((name, index) => (
          <NavigationMenuItem key={name}>
            <Link href={linkUrls[index]} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Balance />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Suspense fallback={<Skeleton className='h-12 w-12 rounded-full' />}>
            <ProfileIcon />
          </Suspense>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ConnectButton showBalance={false} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default TopBar

{
  /* <AppBar
position='sticky'
elevation={0}
sx={{
  height: 50,
  width: '100%',
  fontFamily: 'serif !important',
}}>
<Toolbar>
  <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      aria-label='open drawer'
      onClick={handleDrawerOpen}
      edge='start'
      sx={{ ...(open && { display: 'none' }) }}>
      <MenuIcon />
    </IconButton>
  </Box>

  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
      <Image src='/images/logo_set.png' width='160' height='48' alt='logo' style={{ marginTop: '10px' }} />
    </Link>
  </Box>

  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
    <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
      <Image src='/images/logo_set.png' width='160' height='48' alt='logo' style={{ marginTop: '10px' }} />
    </Link>
  </Box>

  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    {linkNames.map((name, index) => (
      <MenuLink key={name} text={name} link={linkUrls[index]} />
    ))}
  </Box>
  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, mr: '10px' }}>
          <Balance />
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, mr: '10px' }}>
          <Suspense fallback={<Skeleton variant='circular' width={40} height={40} sx={{ bgcolor: 'grey.900' }} />}>
            <ProfileIcon />
          </Suspense>
        </Box>

        <ConnectButton showBalance={false} />
      </Toolbar>
      <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
        <SideDrawer linkNames={linkNames} linkUrls={linkUrls} open={open} handleDrawerClose={handleDrawerClose} />
      </Box>
    </AppBar> */
}
