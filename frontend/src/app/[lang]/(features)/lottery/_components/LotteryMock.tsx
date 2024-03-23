// 'use client'

// import { Address } from 'viem'
// import { useAccount, useWriteContract } from 'wagmi'
// import { z } from 'zod'
// import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
// import { Button } from '@/components/ui/button'
// import { Typography } from '@/components/ui/typography'
// import {
//   maidsLotteryAbi,
//   maidsLotteryAddress,
//   medalNftAbi,
//   medalNftAddress,
//   ticketNftAbi,
//   ticketNftAddress,
//   useReadMaidsLotteryGetLotteryInfo,
// } from '@/lib/generated'

// const schema = z.object({
//   tokenId: z.coerce.number().min(0),
//   maxShares: z.coerce.number().min(1),
//   startTime: z.coerce.number().min(0).default(0),
//   endTime: z.coerce.number().min(1),
//   Prize: z.array(
//     z.object({
//       prizeType: z.coerce.number().min(0),
//       contractAddress: z.string(),
//       tokenId: z.coerce.number().min(0),
//       amount: z.coerce.number().min(1),
//       claimed: z.boolean().default(false),
//     })
//   ),
// })

// const MockPrize = {
//   prizeType: 0,
//   contractAddress: maidsLotteryAddress[11155111] as Address,
//   tokenId: BigInt(0),
//   amount: BigInt(100),
//   claimed: false,
// }

// const LotteryMock = () => {
//   const prizes = [MockPrize]
//   const { address } = useAccount()
//   const { writeContract } = useWriteContract()

//   const { data: lotteryInfo } = useReadMaidsLotteryGetLotteryInfo({
//     args: [BigInt(2)],
//     query: {
//       select: (data) => {
//         return {
//           tokenId: Number(data?.tokenId),
//           maxShares: Number(data?.maxShares),
//           startTime: Number(data?.startTime),
//           endTime: Number(data?.endTime),
//           winners: data?.winners,
//           prize: data?.prizes,
//         }
//       },
//     },
//   })

//   return (
//     <div className='container mx-auto max-w-7xl pb-12'>
//       <Typography variant='h1'>Lottery</Typography>

//       <div className='my-4'>
//         <Typography variant='h2'>1. mint nfts and approve for entry!</Typography>
//         <Typography variant='h3'>Mint Medal NFT</Typography>
//         <Button
//           className='mr-4'
//           onClick={() =>
//             writeContract({
//               address: medalNftAddress[11155111],
//               abi: medalNftAbi,
//               functionName: 'mint',
//               args: [address ?? '0x0', BigInt(0), BigInt(10)],
//             })
//           }>
//           Mint
//         </Button>

//         <Button
//           onClick={() =>
//             writeContract({
//               address: medalNftAddress[11155111],
//               abi: medalNftAbi,
//               functionName: 'setApprovalForAll',
//               args: [maidsLotteryAddress[11155111], true],
//             })
//           }>
//           Approve
//         </Button>

//         <Typography variant='h3'>Mint Ticket NFT</Typography>
//         <Button
//           className='mr-4'
//           onClick={() =>
//             writeContract({
//               address: ticketNftAddress[11155111],
//               abi: ticketNftAbi,
//               functionName: 'mint',
//               args: [address ?? '0x0', BigInt(0), BigInt(10)],
//             })
//           }>
//           Mint
//         </Button>

//         <Button
//           onClick={() =>
//             writeContract({
//               address: ticketNftAddress[11155111],
//               abi: ticketNftAbi,
//               functionName: 'setApprovalForAll',
//               args: [maidsLotteryAddress[11155111], true],
//             })
//           }>
//           Approve
//         </Button>
//       </div>

//       <div className='my-4'>
//         <Typography variant='h2'>2. Create New Lottery</Typography>
//         <Typography variant='h3'>Create New Lottery</Typography>
//         <AutoForm
//           formSchema={schema}
//           fieldConfig={{
//             tokenId: {
//               inputProps: {
//                 placeholder: 'Token ID',
//               },
//             },
//             maxShares: {
//               inputProps: {
//                 placeholder: 'Max Shares',
//               },
//             },
//             startTime: {
//               inputProps: {
//                 placeholder: 'Start Time',
//               },
//             },
//             endTime: {
//               inputProps: {
//                 placeholder: 'End Time',
//               },
//             },
//             Prize: {
//               inputProps: {
//                 placeholder: 'Prize',
//               },
//             },
//           }}
//           onSubmit={(data) =>
//             writeContract({
//               address: maidsLotteryAddress[11155111],
//               abi: maidsLotteryAbi,
//               functionName: 'createNewLottery',
//               args: [
//                 BigInt(data.tokenId),
//                 BigInt(data.maxShares),
//                 BigInt(data.startTime),
//                 BigInt(data.endTime),
//                 prizes,
//               ],
//             })
//           }>
//           <Typography variant='smallText'>* Prize Type: 0 = ERC20, 1 = ERC721, 2 = ERC1155</Typography>
//           <br />
//           <AutoFormSubmit>Create New Lottery</AutoFormSubmit>
//         </AutoForm>
//       </div>

//       <div className='my-4'>
//         <Typography variant='h2'>Lottery Info</Typography>
//         <p>Token ID: {lotteryInfo?.tokenId}</p>
//         <p>Max Shares: {lotteryInfo?.maxShares}</p>
//         <p>Start Time: {lotteryInfo?.startTime}</p>
//         <p>End Time: {lotteryInfo?.endTime}</p>

//         <Typography variant='h2' className='my-4'>
//           Participants
//         </Typography>
//         {
//           <>
//             <p>0x...</p>
//             <p>0x...</p>
//           </>
//         }

//         <Typography variant='h2' className='my-4'>
//           Winners
//         </Typography>
//         {lotteryInfo?.winners?.map((winner) => (
//           <p key={winner}>Winner: {winner}</p>
//         ))}

//         <Typography variant='h2' className='my-4'>
//           Prizes
//         </Typography>
//         {lotteryInfo?.prize.map((prize) => (
//           <div key={prize.tokenId}>
//             <p>PrizeName: $MAIDS</p>
//             <p>ContractAddress: {prize.contractAddress}</p>
//             <p>TokenID: {Number(prize.tokenId)}</p>
//             <p>Amount: {Number(prize.amount)}</p>
//           </div>
//         ))}
//       </div>

//       <div className='my-4'>
//         <Typography variant='h2'>Entry</Typography>
//         <Button
//           onClick={() => {
//             writeContract({
//               address: maidsLotteryAddress[11155111],
//               abi: maidsLotteryAbi,
//               functionName: 'entry',
//               args: [BigInt(2), BigInt(0), BigInt(1)],
//             })
//           }}>
//           Enter
//         </Button>
//       </div>

//       <div className='my-4'>
//         <Typography variant='h2'>Draw</Typography>
//         <Button
//           onClick={() => {
//             writeContract({
//               address: maidsLotteryAddress[11155111],
//               abi: maidsLotteryAbi,
//               functionName: 'draw',
//               args: [BigInt(2)],
//             })
//           }}>
//           Draw
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default LotteryMock
