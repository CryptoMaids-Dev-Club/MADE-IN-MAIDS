'use client'

import { Suspense } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ProfileIcon } from '@/app/_components/Elements/ProfileIcon'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'

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

  const { address } = useAccount()

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto w-auto max-w-full px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type='button'
                  data-drawer-target='drawer-example'
                  data-drawer-show='drawer-example'
                  aria-controls='drawer-example'
                  className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5'></span>
                  <span className='sr-only'>Open main menu</span>
                  <svg
                    className='block h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                  </svg>
                  <svg
                    className='hidden h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetHeader>
                  <SheetTitle>
                    <div className='flex flex-row'>
                      {address ? (
                        <Suspense fallback={<Skeleton className='h-10 w-10 rounded-full' />}>
                          <ProfileIcon address={address} />
                        </Suspense>
                      ) : (
                        <Skeleton className='h-10 w-10 rounded-full' />
                      )}
                      <div className='ml-2 mt-1'>
                        <Balance />
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className='grid gap-4 py-4'>
                  {linkNames.map((name, index) => (
                    <div key={name} className='grid grid-cols-4 items-center gap-4'>
                      <a
                        key={name}
                        href={linkUrls[index]}
                        className='rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                        {name}
                      </a>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className='flex flex-1 items-center sm:items-stretch sm:justify-start'>
            <div className='ml-10 flex shrink-0 items-center'>
              <Link href='/top'>
                <Image src='/images/logo_set.png' width='130' height='39' alt='logo' />
              </Link>
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-1'>
                {linkNames.map((name, index) => (
                  <a
                    key={name}
                    href={linkUrls[index]}
                    className='rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='hidden sm:block'>
              <Balance />
            </div>

            <div className='relative ml-3 hidden sm:block'>
              {address ? (
                <Suspense fallback={<Skeleton className='h-10 w-10 rounded-full' />}>
                  <ProfileIcon address={address} />
                </Suspense>
              ) : (
                <Skeleton className='h-10 w-10 rounded-full' />
              )}
            </div>

            <div className='relative ml-3'>
              <div>
                <ConnectButton showBalance={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
