'use client'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { Balance } from '@/app/_components/Elements/Balance'
import { MenuLink } from '@/app/_components/Elements/MenuLink'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

const SideDrawer = dynamic(() => import('@/app/_components/Elements/Drawer').then((mod) => mod.SideDrawer), {
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

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <AppBar
      enableColorOnDark
      position='sticky'
      color='inherit'
      elevation={0}
      sx={{
        height: 50,
        width: '100%',
        bgcolor: 'rgba(0,0,0,0.87)',
        color: 'white',
        fontFamily: 'serif !important',
      }}>
      <Toolbar>
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color='inherit'
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

        <ConnectButton showBalance={false} />
      </Toolbar>
      <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
        <SideDrawer linkNames={linkNames} linkUrls={linkUrls} open={open} handleDrawerClose={handleDrawerClose} />
      </Box>
    </AppBar>
  )
}

export default TopBar
