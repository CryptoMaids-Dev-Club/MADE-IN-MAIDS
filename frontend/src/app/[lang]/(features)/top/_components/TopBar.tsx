'use client'

import { ProfileIcon } from '@/app/[lang]/_components/Elements/ProfileIcon'
import SwitchLanguageButton from '@/app/[lang]/_components/Elements/SwitchLanguageButton/SwitchLanguageButton'
import { useLanguage } from '@/app/i18n/client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { UserRound } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { useAccount } from 'wagmi'

const Balance = dynamic(() => import('@/app/[lang]/_components/Elements/Balance').then((mod) => mod.Balance), {
  ssr: false,
})

export const TopBar = () => {
  const { language } = useLanguage()

  const linkNames = ['Discord', 'X', 'WebSite', 'TACHIYOMI', 'OS', 'SHOOTING']
  const linkUrls = [
    'https://discord.gg/cryptomaids',
    'https://twitter.com/CryptoMaids',
    'https://cryptomaids.tokyo/home',
    'https://cryptomaids.tokyo/tachiyomi',
    'https://opensea.io/collection/cryptomaids',
    'https://cryptomaids-shooting.netlify.app/',
  ]

  const { address } = useAccount()

  return (
    <nav className='max-w-full bg-gray-900'>
      <div className='px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-12 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type='button'
                  data-drawer-target='drawer-example'
                  data-drawer-show='drawer-example'
                  aria-controls='drawer-example'
                  className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                >
                  <span className='absolute -inset-0.5'></span>
                  <span className='sr-only'>Open main menu</span>
                  <svg
                    className='block size-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                  </svg>
                  <svg
                    className='hidden size-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetHeader>
                  <SheetTitle>
                    <div className='flex flex-row'>
                      {address ? (
                        <Suspense fallback={<Skeleton className='size-10 rounded-full' />}>
                          <ProfileIcon address={address} />
                        </Suspense>
                      ) : (
                        <Skeleton className='size-10 rounded-full' />
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
                        className='rounded-md px-3 py-1 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                      >
                        {name}
                      </a>
                    </div>
                  ))}
                  <SwitchLanguageButton />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className='flex flex-1 items-center xl:items-stretch xl:justify-start'>
            <div className='ml-10 flex shrink-0 items-center'>
              <Link href={`/${language}/top`} className='h-7 w-36 sm:h-9 sm:w-40'>
                <Image 
                  src='/images/common/logo_set.png' 
                  width={160} 
                  height={48} 
                  alt='CryptoMaids - NFT Collection & Marketplace' 
                  priority
                />
              </Link>
            </div>
            <div className='hidden sm:ml-6 lg:block'>
              <div className='flex space-x-1'>
                {linkNames.map((name, index) => (
                  <a
                    key={name}
                    href={linkUrls[index]}
                    className='rounded-md p-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white xl:text-xl'
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className='hidden md:block'>
            <SwitchLanguageButton />
          </div>

          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='hidden sm:block'>
              <Balance />
            </div>

            <div className='relative ml-3 hidden sm:block'>
              {address ? (
                <Suspense fallback={<Skeleton className='size-10 rounded-full' />}>
                  <ProfileIcon address={address} />
                </Suspense>
              ) : (
                <Avatar>
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
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
