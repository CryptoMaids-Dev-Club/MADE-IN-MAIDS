'use client'

import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, useMediaQuery } from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { Balance } from '@/app/_components/Elements/Balance'
import { MenuLink } from '@/app/_components/Elements/MenuLink'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const SideDrawer = dynamic(() => import('@/app/_components/Elements/Drawer').then((mod) => mod.SideDrawer), {
  ssr: false,
})

export const TopBar = () => {
  const linkNames = ['Discord', 'Twitter', 'WebSite', 'TACHIYOMI', 'OS', 'SHOOTING', 'NFT STAKING']
  const linkUrls = [
    'https://discord.gg/cryptomaids',
    'https://twitter.com/CryptoMaids',
    'https://cryptomaids.tokyo/home',
    'https://cryptomaids.tokyo/tachiyomi',
    'https://opensea.io/collection/cryptomaids',
    'https://cryptomaids-shooting.netlify.app/',
    'https://made-in-maids.cryptomaids.tokyo/',
  ]

  const matches = useMediaQuery('(min-width: 560px)')

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        enableColorOnDark
        position='sticky'
        color='inherit'
        elevation={0}
        sx={{
          height: 50,
          width: '100%',
          bgcolor: 'rgba(0,0,0,0.87)',
          flexDirection: 'row',
          color: 'white',
          fontFamily: 'serif !important',
        }}>
        {!matches && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ ...(open && { display: 'none' }), ml: '5px' }}>
            <MenuIcon />
          </IconButton>
        )}
        <Image
          src='/images/maid-eye-icon.png'
          width='22'
          height='30'
          alt='maid'
          style={{ height: '30px', marginTop: '10px', marginLeft: matches ? '25px' : '3px', marginRight: '3px' }}
        />
        <Image
          src='/images/logo_text.png'
          width='160'
          height='45'
          alt='logo'
          style={{ height: '45px', marginTop: '5px' }}
        />
        {matches && (
          <Box sx={{ paddingTop: '10px' }}>
            <MenuLink text='Discord' link='https://discord.gg/cryptomaids' />
            <MenuLink text='Twitter' link='https://twitter.com/CryptoMaids' />
            <MenuLink text='WebSite' link='https://cryptomaids.tokyo/home' />
            <MenuLink text='TACHIYOMI' link='https://cryptomaids.tokyo/tachiyomi' />
            <MenuLink text='OS' link='https://opensea.io/collection/cryptomaids' />
            <MenuLink text='SHOOTING' link='https://cryptomaids-shooting.netlify.app/' />
            <MenuLink text='NFT STAKING' link='https://made-in-maids.cryptomaids.tokyo/' />
          </Box>
        )}
        <Box sx={{ paddingTop: '5px', flexGrow: 1 }} />
        {matches && (
          <Box sx={{ paddingTop: '10px', paddingRight: '10px' }}>
            <Balance />
          </Box>
        )}
        <Box id='connect_button' sx={{ paddingTop: '5px', paddingRight: matches ? '20px' : '0px' }}>
          <ConnectButton showBalance={false} />
        </Box>
      </AppBar>

      {!matches && (
        <SideDrawer linkNames={linkNames} linkUrls={linkUrls} open={open} handleDrawerClose={handleDrawerClose} />
      )}
    </Box>
  )
}

export default TopBar
