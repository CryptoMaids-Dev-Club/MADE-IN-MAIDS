'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAccount, useWriteContract } from 'wagmi'
import { z } from 'zod'

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
    }),
  ),
})

const LotteryMock = () => {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      medalTokenId: 0,
      ticketTokenId: 0,
      maxShares: 0,
      startTime: 0,
      endTime: 0,
      Prize: [],
    },
  })

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

  const onSubmit = (data: z.infer<typeof schema>) => {
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
  }

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
          }
        >
          Mint
        </Button>

        <Button
          onClick={() =>
            writeContract({
              address: medalNftAddress[NETWORK.id],
              abi: medalNftAbi,
              functionName: 'setApprovalForAll',
              args: [maidsLotteryAddress[NETWORK.id], false],
            })
          }
        >
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
          }
        >
          Mint
        </Button>

        <Button
          onClick={() =>
            writeContract({
              address: ticketNftAddress[NETWORK.id],
              abi: ticketNftAbi,
              functionName: 'setApprovalForAll',
              args: [maidsLotteryAddress[NETWORK.id], false],
            })
          }
        >
          Approve
        </Button>
      </div>

      <div className='my-4'>
        <Typography variant='h2'>2. Create New Lottery</Typography>
        <Typography variant='h3'>Create New Lottery</Typography>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='medalTokenId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medal Token Id</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='ticketTokenId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Token Id</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='maxShares'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Shares</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='Prize'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prize</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
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
          }}
        >
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
