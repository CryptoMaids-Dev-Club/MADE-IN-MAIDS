'use client'

import { useAccount, useReadContracts } from 'wagmi'
import { Typography } from '@/components/ui/typography'
import { maidsLotteryConfig, medalNftConfig, ticketNftConfig } from '@/lib/generated'

const UserInfo = () => {
  const { address } = useAccount()
  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: medalNftConfig.address[11155111],
        abi: medalNftConfig.abi,
        functionName: 'balanceOf',
        args: [address ?? '0x', 0n],
      },
      {
        address: ticketNftConfig.address[11155111],
        abi: ticketNftConfig.abi,
        functionName: 'balanceOf',
        args: [address ?? '0x', 0n],
      },
      {
        address: maidsLotteryConfig.address[11155111],
        abi: maidsLotteryConfig.abi,
        functionName: 'entryCountsByLotteryId',
        args: [1n, address ?? '0x'],
      },
    ],
  })

  const [medalBalance, ticketBalance, entryCounts] = data || []

  return (
    <div>
      <Typography variant='largeText'>メダルNFT所持数: {medalBalance?.toString()}</Typography>
      <Typography variant='largeText'>チケットNFT所持数: {ticketBalance?.toString()}</Typography>
      <Typography variant='largeText'>エントリー済み口数: {entryCounts?.toString()}</Typography>
    </div>
  )
}

export default UserInfo
