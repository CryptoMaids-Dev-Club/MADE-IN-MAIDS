'use client'

import { useStaking } from '@/app/[lang]/(features)/staking/_hooks/useStaking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'

const Staking = () => {
  const { openConnectModal } = useConnectModal()
  const { currentBalance, pendingRewards, importMaidsToken, claimRewards, isConnected } = useStaking()

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Banner Image */}
      <div className='relative w-full h-[300px] md:h-[40vh] lg:h-[50vh] min-h-[300px]'>
        <Image src='/images/staking/header.png' alt='CryptoMaids Banner' fill className='object-cover' priority />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-thin mb-4'>Staking</h1>
          <h4 className='text-xl md:text-2xl lg:text-3xl'>Welcome to the CryptoMaids Staking!</h4>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 auto-rows-fr'>
        {/* Left Column */}
        <Card className='bg-zinc-900 border-zinc-800'>
          <CardHeader>
            <CardTitle className='text-emerald-400 text-4xl'>HOLD CRYPTOMAIDS EARN $MAIDS</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-xl'>
              $MAIDS is a community token.
              <br />
              Voting, buying fan art, and more!
            </p>
            <p className='text-yellow-400 text-xl'>1 CryptoMaids NFT 10 $MAIDS/day</p>
            <div className='flex justify-center'>
              <Image
                src='/images/staking/yuki_awaking.png'
                alt='Maid'
                width={500}
                height={500}
                className='max-w-[300px] md:max-w-[500px]'
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className='space-y-6'>
          {/* Import Section */}
          <Card className='bg-zinc-900 border-zinc-800'>
            <CardHeader>
              <CardTitle className='text-emerald-400'>Import $MAIDS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg my-2'>Import $MAIDS to enter the Maids World!</p>
              {isConnected ? (
                <Button
                  className='w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  onClick={importMaidsToken}
                >
                  IMPORT $MAIDS
                </Button>
              ) : (
                <Button
                  className='w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  onClick={openConnectModal}
                >
                  CONNECT WALLET
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Claim Rewards Section */}
          <Card className='bg-zinc-900 border-zinc-800'>
            <CardHeader>
              <CardTitle className='text-emerald-400'>Claim Rewards</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-lg grid grid-cols-4 items-center'>
                <div className='col-span-3'>
                  <p>Claim your Rewards! No gas fee required</p>
                  <p>
                    <span>Pending Rewards: </span>
                    <span className='text-yellow-400'>{pendingRewards} $MAIDS</span>
                  </p>
                </div>
                <Image
                  className='col-span-1 flex items-center'
                  src='/images/staking/yuki.png'
                  alt='Maid'
                  width={100}
                  height={100}
                />
              </div>
              <p className='text-sm text-gray-400'>You can only claim if the pending tokens are over 100</p>
              {isConnected ? (
                <Button
                  className='w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  disabled={!pendingRewards || pendingRewards < 100}
                  onClick={() => claimRewards()}
                >
                  CLAIM
                </Button>
              ) : (
                <Button
                  className='w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  onClick={openConnectModal}
                >
                  CONNECT WALLET
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Buy Section */}
          <Card className='bg-zinc-900 border-zinc-800'>
            <CardHeader>
              <CardTitle className='text-emerald-400'>Buy CryptoMaids Item</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-lg grid grid-cols-4 items-center'>
                <div className='col-span-3'>
                  <p>Buy CryptoMaids Item with $MAIDS</p>
                  <p>
                    <span>Your Balance: </span>
                    <span className='text-yellow-400'>{currentBalance} $MAIDS</span>
                  </p>
                </div>
                <Image
                  className='col-span-1 flex items-center'
                  src='/images/staking/veronica.png'
                  alt='Maid'
                  width={100}
                  height={100}
                />
              </div>
              <Link href='/market'>
                <Button className='w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'>
                  MAIDS MARKET
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Staking
