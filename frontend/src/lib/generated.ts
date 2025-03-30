import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsItem
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const maidsItemAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'uri_', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr_', internalType: 'address', type: 'address' }],
    name: 'addOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'id_', internalType: 'uint256', type: 'uint256' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr_', internalType: 'address', type: 'address' }],
    name: 'removeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'setURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const maidsItemAddress = {
  137: '0x74a8a863545cdf0806a12E14Eb48b728453Bf343',
  11155111: '0x44C90619A015EF1B679D638ECa693b10fB28DC83',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const maidsItemConfig = {
  address: maidsItemAddress,
  abi: maidsItemAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsLottery
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const maidsLotteryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'ticketContract_', internalType: 'address', type: 'address' },
      { name: 'medalContract_', internalType: 'address', type: 'address' },
      { name: 'vrfCoordinator_', internalType: 'address', type: 'address' },
      { name: 'subscriptionId_', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'callbackGasLimit',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      {
        name: 'prize',
        internalType: 'struct MaidsLottery.PrizeInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'prizeName', internalType: 'string', type: 'string' },
          { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'createNewLottery',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'draw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      { name: 'share', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'entriesByLotteryId',
    outputs: [
      { name: 'entryAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shareAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'entry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'entryCountsByLotteryId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gelato',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllLotteries',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsLottery.LotteryInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
          { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'ended', internalType: 'bool', type: 'bool' },
          { name: 'winners', internalType: 'address[]', type: 'address[]' },
          {
            name: 'prizes',
            internalType: 'struct MaidsLottery.PrizeInfo[]',
            type: 'tuple[]',
            components: [
              { name: 'prizeName', internalType: 'string', type: 'string' },
              { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'lotteryId', internalType: 'uint256', type: 'uint256' }],
    name: 'getLotteryInfo',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsLottery.LotteryInfo',
        type: 'tuple',
        components: [
          { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
          { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'ended', internalType: 'bool', type: 'bool' },
          { name: 'winners', internalType: 'address[]', type: 'address[]' },
          {
            name: 'prizes',
            internalType: 'struct MaidsLottery.PrizeInfo[]',
            type: 'tuple[]',
            components: [
              { name: 'prizeName', internalType: 'string', type: 'string' },
              { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isOngoingLatestLottery',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keyHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'lotteries',
    outputs: [
      { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
      { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'ended', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'requestId', internalType: 'uint256', type: 'uint256' }],
    name: 'lotteryIdsByRequestId',
    outputs: [{ name: 'lotteryId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'medalContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'uint256', type: 'uint256' },
      { name: 'randomWords', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestConfirmations',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'requestId', internalType: 'uint256', type: 'uint256' }],
    name: 'requests',
    outputs: [
      { name: 'fulfilled', internalType: 'bool', type: 'bool' },
      { name: 'exists', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'lotteryId', internalType: 'uint256', type: 'uint256' }],
    name: 'returnTicket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'callbackGasLimit_', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'setCallbackGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gelato_', internalType: 'address', type: 'address' }],
    name: 'setGelato',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'keyHash_', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setKeyHash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'medalContract_', internalType: 'address', type: 'address' },
    ],
    name: 'setMedalContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'subscriptionId_', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setSubscriptionId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'ticketContract_', internalType: 'address', type: 'address' },
    ],
    name: 'setTicketContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'vrfCoordinator_', internalType: 'address', type: 'address' },
    ],
    name: 'setVrfCoordinator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'subscriptionId',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ticketContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateLotteryInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'prizes',
        internalType: 'struct MaidsLottery.PrizeInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'prizeName', internalType: 'string', type: 'string' },
          { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'updatePrizeInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vrfCoordinator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lotteryId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'winners',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'Draw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lotteryId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'share',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'entryAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NewEntry',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lotteryId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'medalTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ticketTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'maxShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewLottery',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'randomWords',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'RequestFulfilled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'numWords',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
    ],
    name: 'RequestSent',
  },
  { type: 'error', inputs: [], name: 'AlreadyHasOngoingLottery' },
  { type: 'error', inputs: [], name: 'InvalidArguments' },
  { type: 'error', inputs: [], name: 'LotteryDoesNotExist' },
  { type: 'error', inputs: [], name: 'LotteryHasEnded' },
  { type: 'error', inputs: [], name: 'LotteryIsNotOngoing' },
  { type: 'error', inputs: [], name: 'LotteryIsStillOngoing' },
  { type: 'error', inputs: [], name: 'MaxSharesMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'NotEligibleToReturnTicket' },
  {
    type: 'error',
    inputs: [
      { name: 'have', internalType: 'address', type: 'address' },
      { name: 'want', internalType: 'address', type: 'address' },
    ],
    name: 'OnlyCoordinatorCanFulfill',
  },
  { type: 'error', inputs: [], name: 'OverMaxShares' },
  { type: 'error', inputs: [], name: 'PrizesMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'ShareAmountMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'StartTimeMustBeLessThanEndTime' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const maidsLotteryAddress = {
  137: '0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58',
  11155111: '0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const maidsLotteryConfig = {
  address: maidsLotteryAddress,
  abi: maidsLotteryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsLotteryOld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const maidsLotteryOldAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'ticketContract_', internalType: 'address', type: 'address' },
      { name: 'medalContract_', internalType: 'address', type: 'address' },
      { name: 'vrfCoordinator_', internalType: 'address', type: 'address' },
      { name: 'subscriptionId_', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'callbackGasLimit',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      {
        name: 'prize',
        internalType: 'struct MaidsLottery.PrizeInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'prizeName', internalType: 'string', type: 'string' },
          { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'createNewLottery',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'draw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      { name: 'share', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'entriesByLotteryId',
    outputs: [
      { name: 'entryAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shareAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'entry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'entryCountsByLotteryId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gelato',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllLotteries',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsLottery.LotteryInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
          { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'ended', internalType: 'bool', type: 'bool' },
          { name: 'winners', internalType: 'address[]', type: 'address[]' },
          {
            name: 'prizes',
            internalType: 'struct MaidsLottery.PrizeInfo[]',
            type: 'tuple[]',
            components: [
              { name: 'prizeName', internalType: 'string', type: 'string' },
              { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'lotteryId', internalType: 'uint256', type: 'uint256' }],
    name: 'getLotteryInfo',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsLottery.LotteryInfo',
        type: 'tuple',
        components: [
          { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
          { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'ended', internalType: 'bool', type: 'bool' },
          { name: 'winners', internalType: 'address[]', type: 'address[]' },
          {
            name: 'prizes',
            internalType: 'struct MaidsLottery.PrizeInfo[]',
            type: 'tuple[]',
            components: [
              { name: 'prizeName', internalType: 'string', type: 'string' },
              { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isOngoingLatestLottery',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keyHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'lotteries',
    outputs: [
      { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
      { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'ended', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'requestId', internalType: 'uint256', type: 'uint256' }],
    name: 'lotteryIdsByRequestId',
    outputs: [{ name: 'lotteryId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'medalContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'uint256', type: 'uint256' },
      { name: 'randomWords', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestConfirmations',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'requestId', internalType: 'uint256', type: 'uint256' }],
    name: 'requests',
    outputs: [
      { name: 'fulfilled', internalType: 'bool', type: 'bool' },
      { name: 'exists', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'lotteryId', internalType: 'uint256', type: 'uint256' }],
    name: 'returnTicket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'callbackGasLimit_', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'setCallbackGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gelato_', internalType: 'address', type: 'address' }],
    name: 'setGelato',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'keyHash_', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setKeyHash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'medalContract_', internalType: 'address', type: 'address' },
    ],
    name: 'setMedalContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'subscriptionId_', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setSubscriptionId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'ticketContract_', internalType: 'address', type: 'address' },
    ],
    name: 'setTicketContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'vrfCoordinator_', internalType: 'address', type: 'address' },
    ],
    name: 'setVrfCoordinator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'subscriptionId',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ticketContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      { name: 'medalTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'ticketTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'maxShares', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateLotteryInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lotteryId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'prizes',
        internalType: 'struct MaidsLottery.PrizeInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'prizeName', internalType: 'string', type: 'string' },
          { name: 'prizeImageUrl', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'updatePrizeInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vrfCoordinator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lotteryId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'winners',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'Draw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lotteryId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'share',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'entryAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NewEntry',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lotteryId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'medalTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ticketTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'maxShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewLottery',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'randomWords',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'RequestFulfilled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'numWords',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
    ],
    name: 'RequestSent',
  },
  { type: 'error', inputs: [], name: 'AlreadyHasOngoingLottery' },
  { type: 'error', inputs: [], name: 'InvalidArguments' },
  { type: 'error', inputs: [], name: 'LotteryDoesNotExist' },
  { type: 'error', inputs: [], name: 'LotteryHasEnded' },
  { type: 'error', inputs: [], name: 'LotteryIsNotOngoing' },
  { type: 'error', inputs: [], name: 'LotteryIsStillOngoing' },
  { type: 'error', inputs: [], name: 'MaxSharesMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'NotEligibleToReturnTicket' },
  {
    type: 'error',
    inputs: [
      { name: 'have', internalType: 'address', type: 'address' },
      { name: 'want', internalType: 'address', type: 'address' },
    ],
    name: 'OnlyCoordinatorCanFulfill',
  },
  { type: 'error', inputs: [], name: 'OverMaxShares' },
  { type: 'error', inputs: [], name: 'PrizesMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'ShareAmountMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'StartTimeMustBeLessThanEndTime' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const maidsLotteryOldAddress = {
  137: '0xa15383DE388101fA5071c51b3f6505696862c635',
  11155111: '0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const maidsLotteryOldConfig = {
  address: maidsLotteryOldAddress,
  abi: maidsLotteryOldAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsMarket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const maidsMarketAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'addOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'airdrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyItem',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'marketItem',
        internalType: 'struct MaidsMarketPlace.MarketItem',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'supply', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenURI', internalType: 'string', type: 'string' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'limitPerWallet', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'createMarketItem',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fetchMarketItems',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsMarketPlace.MarketItem[]',
        type: 'tuple[]',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'supply', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenURI', internalType: 'string', type: 'string' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'limitPerWallet', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_nft', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nft',
    outputs: [
      { name: '', internalType: 'contract IMaidsItem1155', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'removeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newNFT', internalType: 'address', type: 'address' }],
    name: 'setNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newStartTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setStartTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newSupply', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setSupply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newToken', internalType: 'address', type: 'address' }],
    name: 'setToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newTokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'setTokenURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'contract IMaidsToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'itemId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'BuyItem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'error', inputs: [], name: 'InvalidArguments' },
  { type: 'error', inputs: [], name: 'NotOperator' },
  { type: 'error', inputs: [], name: 'NotSaleTime' },
  { type: 'error', inputs: [], name: 'OverLimitPerWallet' },
  { type: 'error', inputs: [], name: 'OverSupplyError' },
  { type: 'error', inputs: [], name: 'insufficientAllowanceError' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const maidsMarketAddress = {
  137: '0x937E61302C5565Bdd488DF35Fb7d362a323037f7',
  11155111: '0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const maidsMarketConfig = {
  address: maidsMarketAddress,
  abi: maidsMarketAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsPrediction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const maidsPredictionAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
      { name: 'predictionURI', internalType: 'string', type: 'string' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPrediction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllPredictions',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsPrediction.Prediction[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
          { name: 'predictionURI', internalType: 'string', type: 'string' },
          { name: 'rate', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'result', internalType: 'uint256', type: 'uint256' },
          { name: 'isSettled', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getPrediction',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsPrediction.Prediction',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
          { name: 'predictionURI', internalType: 'string', type: 'string' },
          { name: 'rate', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'result', internalType: 'uint256', type: 'uint256' },
          { name: 'isSettled', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRewardAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTop3Info',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsPrediction.TopUserInfo[3]',
        type: 'tuple[3]',
        components: [
          { name: 'user', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserInfo',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsPrediction.UserInfo',
        type: 'tuple',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'choice', internalType: 'uint256', type: 'uint256' },
          { name: 'isPredicted', internalType: 'bool', type: 'bool' },
          { name: 'isClaimed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getUserInfoOfPrediction',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsPrediction.UserInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'choice', internalType: 'uint256', type: 'uint256' },
          { name: 'isPredicted', internalType: 'bool', type: 'bool' },
          { name: 'isClaimed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token_', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'predict',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'predictions',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
      { name: 'predictionURI', internalType: 'string', type: 'string' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'result', internalType: 'uint256', type: 'uint256' },
      { name: 'isSettled', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setChoicesLength',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setEndTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'predictionURI', internalType: 'string', type: 'string' },
    ],
    name: 'setPredictionURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'setToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'settle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'contract IMaidsToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'top3Users',
    outputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userInfo',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'uint256', type: 'uint256' },
      { name: 'isPredicted', internalType: 'bool', type: 'bool' },
      { name: 'isClaimed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userInfos',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'uint256', type: 'uint256' },
      { name: 'isPredicted', internalType: 'bool', type: 'bool' },
      { name: 'isClaimed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id_', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'choicesLength_',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'predictionURI_',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'rate_',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime_',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PredictionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id_', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'result_',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Settle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'error', inputs: [], name: 'MaidsPrediction_AlreadyClaimed' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_AlreadyPredicted' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_InsufficientAmount' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_InvalidChoice' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_InvalidPredictionId' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_InvalidPredictionURI' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_InvalidRate' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_NotHit' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_NotSettled' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_TimeUp' },
  { type: 'error', inputs: [], name: 'MaidsPrediction_ZeroChoices' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const maidsPredictionAddress = {
  137: '0x478fF14966Fe50645EDc6D1ACa2a5193801d6944',
  11155111: '0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const maidsPredictionConfig = {
  address: maidsPredictionAddress,
  abi: maidsPredictionAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const maidsTokenAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'addOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'info_',
        internalType: 'struct MaidsToken.AirdropInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'airdrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'spender_', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account_', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'removeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from_', internalType: 'address', type: 'address' },
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'InvalidArguments' },
  { type: 'error', inputs: [], name: 'NotOperator' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const maidsTokenAddress = {
  137: '0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF',
  11155111: '0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const maidsTokenConfig = {
  address: maidsTokenAddress,
  abi: maidsTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsTokenYield
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const maidsTokenYieldAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'token_', internalType: 'address', type: 'address' },
      { name: 'minter_', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'Token',
    outputs: [
      { name: '', internalType: 'contract IMaidsToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'caller_', internalType: 'address', type: 'address' },
      { name: 'tokenIds_', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'claim',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId_', internalType: 'uint256', type: 'uint256' }],
    name: 'getPendingTokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds_', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'getPendingTokensMany',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getYieldRateData',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsTokenYield.yieldRate[]',
        type: 'tuple[]',
        components: [
          { name: 'day', internalType: 'uint256', type: 'uint256' },
          { name: 'rate', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'minter_', internalType: 'address', type: 'address' }],
    name: 'setMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'setToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'yieldEndTime_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setYieldEndTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'day_', internalType: 'uint256', type: 'uint256' },
      { name: 'rate_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setYieldRateData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'yieldStartTime_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setYieldStartTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenToLastClaimedTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldEndTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldStartTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenIds_',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'totalClaimed_',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'error', inputs: [], name: 'InvalidTimestamp' },
  { type: 'error', inputs: [], name: 'NotMinter' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const maidsTokenYieldAddress = {
  137: '0x9803445DA8701F6cbc9AE0dD24928961847bdAc2',
  11155111: '0x9803445DA8701F6cbc9AE0dD24928961847bdAc2',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const maidsTokenYieldConfig = {
  address: maidsTokenYieldAddress,
  abi: maidsTokenYieldAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsVoting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const maidsVotingAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllVotes',
    outputs: [
      {
        name: '',
        internalType: 'struct MaidsVoting.Vote[2023]',
        type: 'tuple[2023]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getVoteAmountsOfToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getVoteAmountsOfUser',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVotedAddress',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getVotedAddressOfToken',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newEndTime', internalType: 'uint256', type: 'uint256' }],
    name: 'setEndTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'contract IMaidsToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'error', inputs: [], name: 'TimeUp' },
  { type: 'error', inputs: [], name: 'insufficientAllowanceError' },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const maidsVotingAddress = {
  137: '0x936756a41B244EF81712F95fE347278d42A51C05',
  11155111: '0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const maidsVotingConfig = {
  address: maidsVotingAddress,
  abi: maidsVotingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MedalNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const medalNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const medalNftAddress = {
  137: '0x14c85a7307167253348319113cB5Fad6647fF1a8',
  11155111: '0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const medalNftConfig = {
  address: medalNftAddress,
  abi: medalNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const ticketNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const ticketNftAddress = {
  137: '0x74a8a863545cdf0806a12E14Eb48b728453Bf343',
  11155111: '0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const ticketNftConfig = {
  address: ticketNftAddress,
  abi: ticketNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItem = /*#__PURE__*/ createUseReadContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItemBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItemBalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItemIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItemOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItemSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"uri"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useReadMaidsItemUri = /*#__PURE__*/ createUseReadContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItem = /*#__PURE__*/ createUseWriteContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"addOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemAddOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'addOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemMint = /*#__PURE__*/ createUseWriteContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"removeOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemRemoveOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'removeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"setURI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemSetUri = /*#__PURE__*/ createUseWriteContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
  functionName: 'setURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWriteMaidsItemTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItem = /*#__PURE__*/ createUseSimulateContract({
  abi: maidsItemAbi,
  address: maidsItemAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"addOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemAddOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'addOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: maidsItemAbi, address: maidsItemAddress, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"removeOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemRemoveOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'removeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"setURI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemSetUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'setURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsItemAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useSimulateMaidsItemTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsItemAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWatchMaidsItemEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: maidsItemAbi, address: maidsItemAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsItemAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWatchMaidsItemApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsItemAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWatchMaidsItemOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsItemAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWatchMaidsItemTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsItemAbi}__ and `eventName` set to `"TransferSingle"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWatchMaidsItemTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsItemAbi}__ and `eventName` set to `"URI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const useWatchMaidsItemUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsItemAbi,
    address: maidsItemAddress,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLottery = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"callbackGasLimit"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryCallbackGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'callbackGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"entriesByLotteryId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryEntriesByLotteryId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'entriesByLotteryId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"entryCountsByLotteryId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryEntryCountsByLotteryId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'entryCountsByLotteryId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"gelato"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryGelato = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
  functionName: 'gelato',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"getAllLotteries"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryGetAllLotteries =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'getAllLotteries',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"getLotteryInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryGetLotteryInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'getLotteryInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"isOngoingLatestLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryIsOngoingLatestLottery =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'isOngoingLatestLottery',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"keyHash"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryKeyHash = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
  functionName: 'keyHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"lotteries"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryLotteries = /*#__PURE__*/ createUseReadContract(
  {
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'lotteries',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"lotteryIdsByRequestId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryLotteryIdsByRequestId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'lotteryIdsByRequestId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"medalContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryMedalContract =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'medalContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"requestConfirmations"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryRequestConfirmations =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'requestConfirmations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"requests"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryRequests = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
  functionName: 'requests',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"subscriptionId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotterySubscriptionId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'subscriptionId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotterySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"ticketContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryTicketContract =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'ticketContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"vrfCoordinator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useReadMaidsLotteryVrfCoordinator =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'vrfCoordinator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLottery = /*#__PURE__*/ createUseWriteContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"createNewLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryCreateNewLottery =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'createNewLottery',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"draw"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryDraw = /*#__PURE__*/ createUseWriteContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
  functionName: 'draw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"entry"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryEntry = /*#__PURE__*/ createUseWriteContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
  functionName: 'entry',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryOnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryOnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryRawFulfillRandomWords =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"returnTicket"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryReturnTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'returnTicket',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setCallbackGasLimit"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetCallbackGasLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setCallbackGasLimit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setGelato"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetGelato =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setGelato',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setKeyHash"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetKeyHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setKeyHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setMedalContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetMedalContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setMedalContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setSubscriptionId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetSubscriptionId =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setSubscriptionId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setTicketContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetTicketContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setTicketContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setVrfCoordinator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotterySetVrfCoordinator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setVrfCoordinator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"updateLotteryInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryUpdateLotteryInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'updateLotteryInfo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"updatePrizeInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWriteMaidsLotteryUpdatePrizeInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'updatePrizeInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLottery = /*#__PURE__*/ createUseSimulateContract({
  abi: maidsLotteryAbi,
  address: maidsLotteryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"createNewLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryCreateNewLottery =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'createNewLottery',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"draw"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'draw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"entry"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryEntry =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'entry',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryOnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryOnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryRawFulfillRandomWords =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"returnTicket"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryReturnTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'returnTicket',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setCallbackGasLimit"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetCallbackGasLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setCallbackGasLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setGelato"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetGelato =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setGelato',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setKeyHash"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetKeyHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setKeyHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setMedalContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetMedalContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setMedalContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setSubscriptionId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetSubscriptionId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setSubscriptionId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setTicketContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetTicketContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setTicketContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"setVrfCoordinator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotterySetVrfCoordinator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'setVrfCoordinator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"updateLotteryInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryUpdateLotteryInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'updateLotteryInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryAbi}__ and `functionName` set to `"updatePrizeInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useSimulateMaidsLotteryUpdatePrizeInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    functionName: 'updatePrizeInfo',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"Draw"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryDrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'Draw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"NewEntry"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryNewEntryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'NewEntry',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"NewLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryNewLotteryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'NewLottery',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"OwnershipTransferRequested"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryOwnershipTransferRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'OwnershipTransferRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"RequestFulfilled"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryRequestFulfilledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'RequestFulfilled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryAbi}__ and `eventName` set to `"RequestSent"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26)
 */
export const useWatchMaidsLotteryRequestSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryAbi,
    address: maidsLotteryAddress,
    eventName: 'RequestSent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOld = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryOldAbi,
  address: maidsLotteryOldAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"callbackGasLimit"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldCallbackGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'callbackGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"entriesByLotteryId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldEntriesByLotteryId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'entriesByLotteryId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"entryCountsByLotteryId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldEntryCountsByLotteryId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'entryCountsByLotteryId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"gelato"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldGelato = /*#__PURE__*/ createUseReadContract(
  {
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'gelato',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"getAllLotteries"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldGetAllLotteries =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'getAllLotteries',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"getLotteryInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldGetLotteryInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'getLotteryInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"isOngoingLatestLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldIsOngoingLatestLottery =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'isOngoingLatestLottery',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"keyHash"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldKeyHash =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'keyHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"lotteries"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldLotteries =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'lotteries',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"lotteryIdsByRequestId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldLotteryIdsByRequestId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'lotteryIdsByRequestId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"medalContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldMedalContract =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'medalContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsLotteryOldAbi,
  address: maidsLotteryOldAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"requestConfirmations"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldRequestConfirmations =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'requestConfirmations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"requests"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldRequests =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'requests',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"subscriptionId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldSubscriptionId =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'subscriptionId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"ticketContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldTicketContract =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'ticketContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"vrfCoordinator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useReadMaidsLotteryOldVrfCoordinator =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'vrfCoordinator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOld = /*#__PURE__*/ createUseWriteContract({
  abi: maidsLotteryOldAbi,
  address: maidsLotteryOldAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"createNewLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldCreateNewLottery =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'createNewLottery',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"draw"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldDraw = /*#__PURE__*/ createUseWriteContract(
  {
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'draw',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"entry"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldEntry =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'entry',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldOnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldOnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldRawFulfillRandomWords =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"returnTicket"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldReturnTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'returnTicket',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setCallbackGasLimit"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetCallbackGasLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setCallbackGasLimit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setGelato"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetGelato =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setGelato',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setKeyHash"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetKeyHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setKeyHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setMedalContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetMedalContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setMedalContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setSubscriptionId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetSubscriptionId =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setSubscriptionId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setTicketContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetTicketContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setTicketContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setVrfCoordinator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldSetVrfCoordinator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setVrfCoordinator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"updateLotteryInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldUpdateLotteryInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'updateLotteryInfo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"updatePrizeInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWriteMaidsLotteryOldUpdatePrizeInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'updatePrizeInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOld =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"createNewLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldCreateNewLottery =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'createNewLottery',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"draw"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'draw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"entry"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldEntry =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'entry',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldOnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldOnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldRawFulfillRandomWords =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"returnTicket"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldReturnTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'returnTicket',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setCallbackGasLimit"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetCallbackGasLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setCallbackGasLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setGelato"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetGelato =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setGelato',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setKeyHash"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetKeyHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setKeyHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setMedalContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetMedalContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setMedalContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setSubscriptionId"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetSubscriptionId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setSubscriptionId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setTicketContract"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetTicketContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setTicketContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"setVrfCoordinator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldSetVrfCoordinator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'setVrfCoordinator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"updateLotteryInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldUpdateLotteryInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'updateLotteryInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `functionName` set to `"updatePrizeInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useSimulateMaidsLotteryOldUpdatePrizeInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    functionName: 'updatePrizeInfo',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"Draw"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldDrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'Draw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"NewEntry"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldNewEntryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'NewEntry',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"NewLottery"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldNewLotteryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'NewLottery',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"OwnershipTransferRequested"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldOwnershipTransferRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'OwnershipTransferRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"RequestFulfilled"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldRequestFulfilledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'RequestFulfilled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsLotteryOldAbi}__ and `eventName` set to `"RequestSent"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xa15383DE388101fA5071c51b3f6505696862c635)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43)
 */
export const useWatchMaidsLotteryOldRequestSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsLotteryOldAbi,
    address: maidsLotteryOldAddress,
    eventName: 'RequestSent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarket = /*#__PURE__*/ createUseReadContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"fetchMarketItems"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketFetchMarketItems =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'fetchMarketItems',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"getImplementation"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketGetImplementation =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'getImplementation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"nft"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketNft = /*#__PURE__*/ createUseReadContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'nft',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketPaused = /*#__PURE__*/ createUseReadContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useReadMaidsMarketToken = /*#__PURE__*/ createUseReadContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarket = /*#__PURE__*/ createUseWriteContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"addOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketAddOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'addOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"airdrop"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'airdrop',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"buyItem"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketBuyItem = /*#__PURE__*/ createUseWriteContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'buyItem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"createMarketItem"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketCreateMarketItem =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'createMarketItem',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketPause = /*#__PURE__*/ createUseWriteContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"removeOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketRemoveOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'removeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setNFT"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketSetNft = /*#__PURE__*/ createUseWriteContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'setNFT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setPrice"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketSetPrice = /*#__PURE__*/ createUseWriteContract(
  {
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setPrice',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setStartTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketSetStartTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setStartTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setSupply"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketSetSupply =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketSetToken = /*#__PURE__*/ createUseWriteContract(
  {
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setToken',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setTokenURI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketSetTokenUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setTokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketUpgradeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWriteMaidsMarketUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarket = /*#__PURE__*/ createUseSimulateContract({
  abi: maidsMarketAbi,
  address: maidsMarketAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"addOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketAddOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'addOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"airdrop"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketAirdrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'airdrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"buyItem"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketBuyItem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'buyItem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"createMarketItem"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketCreateMarketItem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'createMarketItem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"removeOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketRemoveOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'removeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setNFT"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketSetNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setPrice"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketSetPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setStartTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketSetStartTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setStartTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setSupply"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketSetSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setSupply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketSetToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"setTokenURI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketSetTokenUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'setTokenURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketUpgradeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsMarketAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useSimulateMaidsMarketUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"BeaconUpgraded"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"BuyItem"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketBuyItemEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'BuyItem',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsMarketAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955)
 */
export const useWatchMaidsMarketUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsMarketAbi,
    address: maidsMarketAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPrediction = /*#__PURE__*/ createUseReadContract({
  abi: maidsPredictionAbi,
  address: maidsPredictionAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getAllPredictions"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetAllPredictions =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getAllPredictions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getImplementation"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetImplementation =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getImplementation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getPrediction"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetPrediction =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getPrediction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getRewardAmount"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetRewardAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getRewardAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getTop3Info"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetTop3Info =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getTop3Info',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getUserInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetUserInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getUserInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"getUserInfoOfPrediction"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionGetUserInfoOfPrediction =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'getUserInfoOfPrediction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsPredictionAbi,
  address: maidsPredictionAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"predictions"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionPredictions =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'predictions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionToken = /*#__PURE__*/ createUseReadContract({
  abi: maidsPredictionAbi,
  address: maidsPredictionAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"top3Users"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionTop3Users =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'top3Users',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"userInfo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionUserInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'userInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"userInfos"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useReadMaidsPredictionUserInfos =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'userInfos',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPrediction = /*#__PURE__*/ createUseWriteContract({
  abi: maidsPredictionAbi,
  address: maidsPredictionAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"claimReward"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"createPrediction"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionCreatePrediction =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'createPrediction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"predict"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionPredict =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'predict',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setChoicesLength"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionSetChoicesLength =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setChoicesLength',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionSetEndTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setEndTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setPredictionURI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionSetPredictionUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setPredictionURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setRate"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionSetRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionSetToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"settle"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionSettle =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'settle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionUpgradeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWriteMaidsPredictionUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPrediction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"claimReward"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"createPrediction"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionCreatePrediction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'createPrediction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"predict"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionPredict =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'predict',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setChoicesLength"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionSetChoicesLength =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setChoicesLength',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionSetEndTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setEndTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setPredictionURI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionSetPredictionUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setPredictionURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setRate"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionSetRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"setToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionSetToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'setToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"settle"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionSettle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'settle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionUpgradeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsPredictionAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useSimulateMaidsPredictionUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"BeaconUpgraded"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"PredictionCreated"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionPredictionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'PredictionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"Settle"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionSettleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'Settle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsPredictionAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const useWatchMaidsPredictionUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsPredictionAbi,
    address: maidsPredictionAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsToken = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenName = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useReadMaidsTokenTotalSupply = /*#__PURE__*/ createUseReadContract(
  {
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'totalSupply',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsToken = /*#__PURE__*/ createUseWriteContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"addOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenAddOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'addOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"airdrop"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'airdrop',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"removeOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenRemoveOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'removeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWriteMaidsTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsToken = /*#__PURE__*/ createUseSimulateContract({
  abi: maidsTokenAbi,
  address: maidsTokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"addOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenAddOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'addOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"airdrop"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenAirdrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'airdrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"removeOperator"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenRemoveOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'removeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useSimulateMaidsTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWatchMaidsTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWatchMaidsTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWatchMaidsTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const useWatchMaidsTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenAbi,
    address: maidsTokenAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYield = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenYieldAbi,
  address: maidsTokenYieldAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"Token"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldToken = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenYieldAbi,
  address: maidsTokenYieldAddress,
  functionName: 'Token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"getPendingTokens"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldGetPendingTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'getPendingTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"getPendingTokensMany"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldGetPendingTokensMany =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'getPendingTokensMany',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"getYieldRateData"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldGetYieldRateData =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'getYieldRateData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"minter"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldMinter = /*#__PURE__*/ createUseReadContract(
  {
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'minter',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsTokenYieldAbi,
  address: maidsTokenYieldAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"tokenToLastClaimedTimestamp"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldTokenToLastClaimedTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'tokenToLastClaimedTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"yieldEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldYieldEndTime =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'yieldEndTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"yieldStartTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useReadMaidsTokenYieldYieldStartTime =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'yieldStartTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYield = /*#__PURE__*/ createUseWriteContract({
  abi: maidsTokenYieldAbi,
  address: maidsTokenYieldAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldClaim =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setMinter"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldSetMinter =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setMinter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldSetToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setYieldEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldSetYieldEndTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setYieldEndTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setYieldRateData"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldSetYieldRateData =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setYieldRateData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setYieldStartTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldSetYieldStartTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setYieldStartTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWriteMaidsTokenYieldTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYield =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setMinter"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldSetMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setMinter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldSetToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setYieldEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldSetYieldEndTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setYieldEndTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setYieldRateData"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldSetYieldRateData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setYieldRateData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"setYieldStartTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldSetYieldStartTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'setYieldStartTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useSimulateMaidsTokenYieldTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenYieldAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWatchMaidsTokenYieldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `eventName` set to `"Claim"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWatchMaidsTokenYieldClaimEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    eventName: 'Claim',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsTokenYieldAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9803445DA8701F6cbc9AE0dD24928961847bdAc2)
 */
export const useWatchMaidsTokenYieldOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsTokenYieldAbi,
    address: maidsTokenYieldAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVoting = /*#__PURE__*/ createUseReadContract({
  abi: maidsVotingAbi,
  address: maidsVotingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"getAllVotes"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingGetAllVotes =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'getAllVotes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"getVoteAmountsOfToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingGetVoteAmountsOfToken =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'getVoteAmountsOfToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"getVoteAmountsOfUser"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingGetVoteAmountsOfUser =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'getVoteAmountsOfUser',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"getVotedAddress"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingGetVotedAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'getVotedAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"getVotedAddressOfToken"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingGetVotedAddressOfToken =
  /*#__PURE__*/ createUseReadContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'getVotedAddressOfToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingOwner = /*#__PURE__*/ createUseReadContract({
  abi: maidsVotingAbi,
  address: maidsVotingAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useReadMaidsVotingToken = /*#__PURE__*/ createUseReadContract({
  abi: maidsVotingAbi,
  address: maidsVotingAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsVotingAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWriteMaidsVoting = /*#__PURE__*/ createUseWriteContract({
  abi: maidsVotingAbi,
  address: maidsVotingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWriteMaidsVotingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"setEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWriteMaidsVotingSetEndTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'setEndTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWriteMaidsVotingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"vote"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWriteMaidsVotingVote = /*#__PURE__*/ createUseWriteContract({
  abi: maidsVotingAbi,
  address: maidsVotingAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsVotingAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useSimulateMaidsVoting = /*#__PURE__*/ createUseSimulateContract({
  abi: maidsVotingAbi,
  address: maidsVotingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useSimulateMaidsVotingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"setEndTime"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useSimulateMaidsVotingSetEndTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'setEndTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useSimulateMaidsVotingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link maidsVotingAbi}__ and `functionName` set to `"vote"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useSimulateMaidsVotingVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsVotingAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWatchMaidsVotingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link maidsVotingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const useWatchMaidsVotingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: maidsVotingAbi,
    address: maidsVotingAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link medalNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useReadMedalNft = /*#__PURE__*/ createUseReadContract({
  abi: medalNftAbi,
  address: medalNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useReadMedalNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: medalNftAbi,
  address: medalNftAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useReadMedalNftBalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useReadMedalNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useReadMedalNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"uri"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useReadMedalNftUri = /*#__PURE__*/ createUseReadContract({
  abi: medalNftAbi,
  address: medalNftAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link medalNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWriteMedalNft = /*#__PURE__*/ createUseWriteContract({
  abi: medalNftAbi,
  address: medalNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWriteMedalNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: medalNftAbi,
  address: medalNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWriteMedalNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWriteMedalNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWriteMedalNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link medalNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useSimulateMedalNft = /*#__PURE__*/ createUseSimulateContract({
  abi: medalNftAbi,
  address: medalNftAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useSimulateMedalNftMint = /*#__PURE__*/ createUseSimulateContract({
  abi: medalNftAbi,
  address: medalNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useSimulateMedalNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useSimulateMedalNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link medalNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useSimulateMedalNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: medalNftAbi,
    address: medalNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link medalNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWatchMedalNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: medalNftAbi,
  address: medalNftAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link medalNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWatchMedalNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: medalNftAbi,
    address: medalNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link medalNftAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWatchMedalNftTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: medalNftAbi,
    address: medalNftAddress,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link medalNftAbi}__ and `eventName` set to `"TransferSingle"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWatchMedalNftTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: medalNftAbi,
    address: medalNftAddress,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link medalNftAbi}__ and `eventName` set to `"URI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x14c85a7307167253348319113cB5Fad6647fF1a8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2)
 */
export const useWatchMedalNftUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: medalNftAbi,
    address: medalNftAddress,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useReadTicketNft = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  address: ticketNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useReadTicketNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  address: ticketNftAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useReadTicketNftBalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useReadTicketNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useReadTicketNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"uri"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useReadTicketNftUri = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  address: ticketNftAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWriteTicketNft = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
  address: ticketNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWriteTicketNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
  address: ticketNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWriteTicketNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWriteTicketNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWriteTicketNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useSimulateTicketNft = /*#__PURE__*/ createUseSimulateContract({
  abi: ticketNftAbi,
  address: ticketNftAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useSimulateTicketNftMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: ticketNftAbi, address: ticketNftAddress, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useSimulateTicketNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useSimulateTicketNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useSimulateTicketNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWatchTicketNftEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: ticketNftAbi, address: ticketNftAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWatchTicketNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWatchTicketNftTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"TransferSingle"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWatchTicketNftTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"URI"`
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E)
 */
export const useWatchTicketNftUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    address: ticketNftAddress,
    eventName: 'URI',
  })
