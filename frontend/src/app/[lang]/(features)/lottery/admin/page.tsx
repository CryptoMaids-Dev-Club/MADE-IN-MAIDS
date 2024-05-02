'use client'

import { useAccount, useWriteContract } from 'wagmi'
import { z } from 'zod'
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { NETWORK } from '@/config/client'
import {
  maidsLotteryAbi,
  maidsLotteryAddress,
  medalNftAbi,
  medalNftAddress,
  ticketNftAbi,
  ticketNftAddress,
  useReadMaidsLotteryGetLotteryInfo,
  useWriteMaidsLotteryDraw,
} from '@/lib/generated'

const schema = z.object({
  medalTokenId: z.coerce.number().min(0),
  ticketTokenId: z.coerce.number().min(0),
  maxShares: z.coerce.number().min(1),
  startTime: z.coerce.number().min(0).default(0),
  endTime: z.coerce.number().min(1),
  Prize: z.array(
    z.object({
      prizeName: z.string().min(1),
      prizeImageUrl: z.string().min(1),
    })
  ),
})

const LotteryMock = () => {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const { data: lotteryInfo } = useReadMaidsLotteryGetLotteryInfo({
    args: [BigInt(0)],
    query: {
      select: (data) => {
        return {
          medalTokenId: Number(data?.medalTokenId),
          ticketTokenId: Number(data?.ticketTokenId),
          maxShares: Number(data?.maxShares),
          startTime: Number(data?.startTime),
          endTime: Number(data?.endTime),
          winners: data?.winners,
          prize: data?.prizes,
        }
      },
    },
  })

  const { writeContract: draw, error } = useWriteMaidsLotteryDraw()

  return (
    <div className='container mx-auto max-w-7xl pb-12'>
      <Typography variant='h1'>Lottery</Typography>

      <div className='my-4'>
        <Typography variant='h2'>1. mint nfts and approve for entry!</Typography>
        <Typography variant='h3'>Mint Medal NFT</Typography>
        <Button
          className='mr-4'
          onClick={() =>
            writeContract({
              address: medalNftAddress[NETWORK.id],
              abi: medalNftAbi,
              functionName: 'mint',
              args: [address ?? '0x0', BigInt(0), BigInt(10)],
            })
          }>
          Mint
        </Button>

        <Button
          onClick={() =>
            writeContract({
              address: medalNftAddress[NETWORK.id],
              abi: medalNftAbi,
              functionName: 'setApprovalForAll',
              args: [maidsLotteryAddress[NETWORK.id], true],
            })
          }>
          Approve
        </Button>

        <Typography variant='h3'>Mint Ticket NFT</Typography>
        <Button
          className='mr-4'
          onClick={() =>
            writeContract({
              address: ticketNftAddress[NETWORK.id],
              abi: ticketNftAbi,
              functionName: 'mint',
              args: [address ?? '0x0', BigInt(0), BigInt(10)],
            })
          }>
          Mint
        </Button>

        <Button
          onClick={() =>
            writeContract({
              address: ticketNftAddress[NETWORK.id],
              abi: ticketNftAbi,
              functionName: 'setApprovalForAll',
              args: [maidsLotteryAddress[NETWORK.id], true],
            })
          }>
          Approve
        </Button>
      </div>

      <div className='my-4'>
        <Typography variant='h2'>2. Create New Lottery</Typography>
        <Typography variant='h3'>Create New Lottery</Typography>
        <AutoForm
          formSchema={schema}
          fieldConfig={{
            medalTokenId: {
              inputProps: {
                placeholder: 'MedalToken ID',
              },
            },
            ticketTokenId: {
              inputProps: {
                placeholder: 'TicketToken ID',
              },
            },
            maxShares: {
              inputProps: {
                placeholder: 'Max Shares',
              },
            },
            startTime: {
              inputProps: {
                placeholder: 'Start Time',
              },
            },
            endTime: {
              inputProps: {
                placeholder: 'End Time',
              },
            },
            Prize: {
              inputProps: {
                placeholder: 'Prize',
              },
            },
          }}
          onSubmit={(data) =>
            writeContract({
              address: maidsLotteryAddress[NETWORK.id],
              abi: maidsLotteryAbi,
              functionName: 'createNewLottery',
              args: [
                BigInt(data.medalTokenId),
                BigInt(data.ticketTokenId),
                BigInt(data.maxShares),
                BigInt(data.startTime),
                BigInt(data.endTime),
                data.Prize.map((prize) => ({
                  prizeName: prize.prizeName,
                  prizeImageUrl: prize.prizeImageUrl,
                })),
              ],
            })
          }>
          <Typography variant='smallText'>* Prize Type: 0 = ERC20, 1 = ERC721, 2 = ERC1155</Typography>
          <br />
          <AutoFormSubmit>Create New Lottery</AutoFormSubmit>
        </AutoForm>
      </div>

      <div className='my-4'>
        <Typography variant='h2'>Lottery Info</Typography>
        <p>MedalToken ID: {lotteryInfo?.medalTokenId}</p>
        <p>TicketToken ID: {lotteryInfo?.ticketTokenId}</p>
        <p>Max Shares: {lotteryInfo?.maxShares}</p>
        <p>Start Time: {lotteryInfo?.startTime}</p>
        <p>End Time: {lotteryInfo?.endTime}</p>

        <Typography variant='h2' className='my-4'>
          Participants
        </Typography>
        {
          <>
            <p>0x...</p>
            <p>0x...</p>
          </>
        }

        {/* <Typography variant='h2' className='my-4'>
          Winners
        </Typography>
        {lotteryInfo?.winners?.map((winner) => (
          <p key={winner}>Winner: {winner}</p>
        ))} */}

        <Typography variant='h2' className='my-4'>
          Prizes
        </Typography>
        {lotteryInfo?.prize.map((prize) => (
          <div key={prize.prizeName}>
            <p>PrizeName: {prize.prizeName}</p>
          </div>
        ))}
      </div>

      <div className='my-4'>
        <Typography variant='h2'>Entry</Typography>
        <Button
          onClick={() => {
            writeContract({
              address: maidsLotteryAddress[NETWORK.id],
              abi: maidsLotteryAbi,
              functionName: 'entry',
              args: [BigInt(1)],
            })
          }}>
          Enter
        </Button>
      </div>

      <div className='my-4'>
        <Typography variant='h2'>Draw</Typography>
        <Button onClick={() => draw({})}>Draw</Button>
        <div>{error?.message}</div>
      </div>
    </div>
  )
}

export default LotteryMock
