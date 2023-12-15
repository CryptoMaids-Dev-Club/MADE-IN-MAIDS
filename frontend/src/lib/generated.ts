import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsItem
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export const maidsItemABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: 'uri_', internalType: 'string', type: 'string' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
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
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'addr_', internalType: 'address', type: 'address' }],
    name: 'addOperator',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'id_', internalType: 'uint256', type: 'uint256' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'addr_', internalType: 'address', type: 'address' }],
    name: 'removeOperator',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
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
  },
  {
    stateMutability: 'nonpayable',
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
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'setURI',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
export const maidsItemConfig = { address: maidsItemAddress, abi: maidsItemABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsMarket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export const maidsMarketABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidArguments' },
  { type: 'error', inputs: [], name: 'NotOperator' },
  { type: 'error', inputs: [], name: 'NotSaleTime' },
  { type: 'error', inputs: [], name: 'OverLimitPerWallet' },
  { type: 'error', inputs: [], name: 'OverSupplyError' },
  { type: 'error', inputs: [], name: 'insufficientAllowanceError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newAdmin', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'beacon', internalType: 'address', type: 'address', indexed: true }],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'buyer', internalType: 'address', type: 'address', indexed: true },
      { name: 'itemId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'BuyItem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'version', internalType: 'uint8', type: 'uint8', indexed: false }],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'addOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'airdrop',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyItem',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
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
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_nft', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nft',
    outputs: [{ name: '', internalType: 'contract IMaidsItem1155', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'removeOperator',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newNFT', internalType: 'address', type: 'address' }],
    name: 'setNFT',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPrice',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newSupply', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setSupply',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newToken', internalType: 'address', type: 'address' }],
    name: 'setToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'newTokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'setTokenURI',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IMaidsToken', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newImplementation', internalType: 'address', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export const maidsMarketAddress = {
  137: '0x937E61302C5565Bdd488DF35Fb7d362a323037f7',
  11155111: '0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871',
} as const

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export const maidsMarketConfig = { address: maidsMarketAddress, abi: maidsMarketABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsPrediction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export const maidsPredictionABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newAdmin', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'beacon', internalType: 'address', type: 'address', indexed: true }],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'version', internalType: 'uint8', type: 'uint8', indexed: false }],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id_', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'choicesLength_', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'predictionURI_', internalType: 'string', type: 'string', indexed: false },
      { name: 'rate_', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'endTime_', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'PredictionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id_', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'result_', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Settle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'claimReward',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
      { name: 'predictionURI', internalType: 'string', type: 'string' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPrediction',
    outputs: [],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRewardAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'token_', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'predict',
    outputs: [],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'choicesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setChoicesLength',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setEndTime',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'predictionURI', internalType: 'string', type: 'string' },
    ],
    name: 'setPredictionURI',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setRate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'setToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'settle',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IMaidsToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'top3Users',
    outputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newImplementation', internalType: 'address', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
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
  },
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
export const maidsPredictionConfig = { address: maidsPredictionAddress, abi: maidsPredictionABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export const maidsTokenABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidArguments' },
  { type: 'error', inputs: [], name: 'NotOperator' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'addOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'spender_', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account_', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'removeOperator',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from_', internalType: 'address', type: 'address' },
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
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
export const maidsTokenConfig = { address: maidsTokenAddress, abi: maidsTokenABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaidsVoting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export const maidsVotingABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'TimeUp' },
  { type: 'error', inputs: [], name: 'insufficientAllowanceError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getVoteAmountsOfToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getVoteAmountsOfUser',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getVotedAddress',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getVotedAddressOfToken',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newEndTime', internalType: 'uint256', type: 'uint256' }],
    name: 'setEndTime',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IMaidsToken', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'vote',
    outputs: [],
  },
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
export const maidsVotingConfig = { address: maidsVotingAddress, abi: maidsVotingABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"balanceOfBatch"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemBalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"uri"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemUri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<typeof maidsItemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'uri',
    ...config,
  } as UseContractReadConfig<typeof maidsItemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof maidsItemABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, TFunctionName, TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"addOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemAddOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'addOperator'>['request']['abi'],
        'addOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'addOperator' }
    : UseContractWriteConfig<typeof maidsItemABI, 'addOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'addOperator', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'addOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof maidsItemABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'mint', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"removeOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemRemoveOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'removeOperator'>['request']['abi'],
        'removeOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'removeOperator' }
    : UseContractWriteConfig<typeof maidsItemABI, 'removeOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removeOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'removeOperator', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'removeOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof maidsItemABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'renounceOwnership', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemSafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'safeBatchTransferFrom'>['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<typeof maidsItemABI, 'safeBatchTransferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'safeBatchTransferFrom', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'safeTransferFrom'>['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof maidsItemABI, 'safeTransferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'safeTransferFrom', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'setApprovalForAll'>['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof maidsItemABI, 'setApprovalForAll', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'setApprovalForAll', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"setURI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemSetUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'setURI'>['request']['abi'],
        'setURI',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setURI' }
    : UseContractWriteConfig<typeof maidsItemABI, 'setURI', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setURI'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'setURI', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'setURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsItemAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsItemABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof maidsItemABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsItemABI, 'transferOwnership', TMode>({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsItemABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"addOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemAddOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'addOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'addOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'addOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemMint(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsItemABI, 'mint'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"removeOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemRemoveOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'removeOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'removeOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'removeOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemSafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'safeBatchTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'safeBatchTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"setURI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemSetUri(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsItemABI, 'setURI'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'setURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'setURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsItemABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function usePrepareMaidsItemTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsItemABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsItemAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsItemABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsItemABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof maidsItemABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    ...config,
  } as UseContractEventConfig<typeof maidsItemABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsItemABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof maidsItemABI, 'ApprovalForAll'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof maidsItemABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsItemABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof maidsItemABI, 'OwnershipTransferred'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof maidsItemABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsItemABI}__ and `eventName` set to `"TransferBatch"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemTransferBatchEvent(
  config: Omit<UseContractEventConfig<typeof maidsItemABI, 'TransferBatch'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof maidsItemABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsItemABI}__ and `eventName` set to `"TransferSingle"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemTransferSingleEvent(
  config: Omit<UseContractEventConfig<typeof maidsItemABI, 'TransferSingle'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof maidsItemABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsItemABI}__ and `eventName` set to `"URI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x74a8a863545cdf0806a12E14Eb48b728453Bf343)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x44C90619A015EF1B679D638ECa693b10fB28DC83)
 */
export function useMaidsItemUriEvent(
  config: Omit<UseContractEventConfig<typeof maidsItemABI, 'URI'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsItemAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsItemABI,
    address: maidsItemAddress[chainId as keyof typeof maidsItemAddress],
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof maidsItemABI, 'URI'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"fetchMarketItems"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketFetchMarketItems<
  TFunctionName extends 'fetchMarketItems',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'fetchMarketItems',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"getImplementation"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketGetImplementation<
  TFunctionName extends 'getImplementation',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'getImplementation',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"nft"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketNft<
  TFunctionName extends 'nft',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'nft',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"paused"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"token"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof maidsMarketABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof maidsMarketABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof maidsMarketABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, TFunctionName, TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"addOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketAddOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'addOperator'>['request']['abi'],
        'addOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'addOperator' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'addOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'addOperator', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'addOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"airdrop"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketAirdrop<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'airdrop'>['request']['abi'],
        'airdrop',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'airdrop' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'airdrop', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'airdrop'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'airdrop', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'airdrop',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"buyItem"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketBuyItem<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'buyItem'>['request']['abi'],
        'buyItem',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'buyItem' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'buyItem', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'buyItem'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'buyItem', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'buyItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"createMarketItem"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketCreateMarketItem<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'createMarketItem'>['request']['abi'],
        'createMarketItem',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'createMarketItem' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'createMarketItem', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'createMarketItem'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'createMarketItem', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'createMarketItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'initialize'>['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'initialize', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'pause'>['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'pause', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"removeOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketRemoveOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'removeOperator'>['request']['abi'],
        'removeOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'removeOperator' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'removeOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removeOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'removeOperator', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'removeOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'renounceOwnership', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setNFT"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketSetNft<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'setNFT'>['request']['abi'],
        'setNFT',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setNFT' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'setNFT', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setNFT'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'setNFT', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setNFT',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setPrice"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketSetPrice<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'setPrice'>['request']['abi'],
        'setPrice',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setPrice' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'setPrice', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPrice'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'setPrice', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setPrice',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setSupply"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketSetSupply<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'setSupply'>['request']['abi'],
        'setSupply',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setSupply' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'setSupply', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setSupply'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'setSupply', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setSupply',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setToken"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketSetToken<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'setToken'>['request']['abi'],
        'setToken',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setToken' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'setToken', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setToken'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'setToken', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setTokenURI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketSetTokenUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'setTokenURI'>['request']['abi'],
        'setTokenURI',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setTokenURI' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'setTokenURI', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setTokenURI'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'setTokenURI', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setTokenURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'transferOwnership', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'unpause'>['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'unpause', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketUpgradeTo<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'upgradeTo'>['request']['abi'],
        'upgradeTo',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'upgradeTo' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'upgradeTo', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'upgradeTo', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsMarketAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsMarketABI, 'upgradeToAndCall'>['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'upgradeToAndCall' }
    : UseContractWriteConfig<typeof maidsMarketABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsMarketABI, 'upgradeToAndCall', TMode>({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"addOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketAddOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'addOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'addOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'addOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"airdrop"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketAirdrop(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'airdrop'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'airdrop',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'airdrop'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"buyItem"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketBuyItem(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'buyItem'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'buyItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'buyItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"createMarketItem"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketCreateMarketItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'createMarketItem'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'createMarketItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'createMarketItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketPause(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'pause'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"removeOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketRemoveOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'removeOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'removeOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'removeOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setNFT"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketSetNft(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setNFT'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setNFT',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setNFT'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setPrice"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketSetPrice(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setPrice'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setPrice',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setPrice'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setSupply"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketSetSupply(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setSupply'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setSupply',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setSupply'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setToken"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketSetToken(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setToken'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"setTokenURI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketSetTokenUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setTokenURI'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'setTokenURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'setTokenURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketUnpause(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsMarketABI, 'unpause'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'upgradeTo'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'upgradeTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsMarketABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function usePrepareMaidsMarketUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsMarketABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsMarketABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"AdminChanged"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketAdminChangedEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'AdminChanged'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"BeaconUpgraded"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketBeaconUpgradedEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'BeaconUpgraded'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"BuyItem"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketBuyItemEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'BuyItem'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'BuyItem',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'BuyItem'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketInitializedEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'Initialized'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof maidsMarketABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof maidsMarketAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"Paused"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketPausedEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'Paused'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"Unpaused"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketUnpausedEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'Unpaused'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsMarketABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x937E61302C5565Bdd488DF35Fb7d362a323037f7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871)
 */
export function useMaidsMarketUpgradedEvent(
  config: Omit<UseContractEventConfig<typeof maidsMarketABI, 'Upgraded'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsMarketAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsMarketABI,
    address: maidsMarketAddress[chainId as keyof typeof maidsMarketAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof maidsMarketABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getAllPredictions"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetAllPredictions<
  TFunctionName extends 'getAllPredictions',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getAllPredictions',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getImplementation"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetImplementation<
  TFunctionName extends 'getImplementation',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getImplementation',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getPrediction"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetPrediction<
  TFunctionName extends 'getPrediction',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getPrediction',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getRewardAmount"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetRewardAmount<
  TFunctionName extends 'getRewardAmount',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getRewardAmount',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getTop3Info"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetTop3Info<
  TFunctionName extends 'getTop3Info',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getTop3Info',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getUserInfo"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetUserInfo<
  TFunctionName extends 'getUserInfo',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getUserInfo',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"getUserInfoOfPrediction"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionGetUserInfoOfPrediction<
  TFunctionName extends 'getUserInfoOfPrediction',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'getUserInfoOfPrediction',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"predictions"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionPredictions<
  TFunctionName extends 'predictions',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'predictions',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"token"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"top3Users"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionTop3Users<
  TFunctionName extends 'top3Users',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'top3Users',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"userInfo"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionUserInfo<
  TFunctionName extends 'userInfo',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'userInfo',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"userInfos"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionUserInfos<
  TFunctionName extends 'userInfos',
  TSelectData = ReadContractResult<typeof maidsPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'userInfos',
    ...config,
  } as UseContractReadConfig<typeof maidsPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof maidsPredictionABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, TFunctionName, TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"claimReward"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionClaimReward<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'claimReward'>['request']['abi'],
        'claimReward',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'claimReward' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'claimReward', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claimReward'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'claimReward', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'claimReward',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"createPrediction"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionCreatePrediction<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'createPrediction'>['request']['abi'],
        'createPrediction',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'createPrediction' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'createPrediction', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'createPrediction'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'createPrediction', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'createPrediction',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'initialize'>['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'initialize', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"predict"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionPredict<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'predict'>['request']['abi'],
        'predict',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'predict' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'predict', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'predict'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'predict', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'predict',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'renounceOwnership', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setChoicesLength"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSetChoicesLength<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'setChoicesLength'>['request']['abi'],
        'setChoicesLength',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setChoicesLength' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'setChoicesLength', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setChoicesLength'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'setChoicesLength', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setChoicesLength',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setEndTime"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSetEndTime<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'setEndTime'>['request']['abi'],
        'setEndTime',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setEndTime' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'setEndTime', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setEndTime'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'setEndTime', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setEndTime',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setPredictionURI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSetPredictionUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'setPredictionURI'>['request']['abi'],
        'setPredictionURI',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setPredictionURI' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'setPredictionURI', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPredictionURI'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'setPredictionURI', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setPredictionURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setRate"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSetRate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'setRate'>['request']['abi'],
        'setRate',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setRate' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'setRate', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setRate'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'setRate', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setRate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setToken"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSetToken<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'setToken'>['request']['abi'],
        'setToken',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setToken' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'setToken', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setToken'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'setToken', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"settle"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSettle<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'settle'>['request']['abi'],
        'settle',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'settle' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'settle', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'settle'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'settle', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'settle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'transferOwnership', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionUpgradeTo<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'upgradeTo'>['request']['abi'],
        'upgradeTo',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'upgradeTo' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'upgradeTo', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'upgradeTo', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsPredictionABI, 'upgradeToAndCall'>['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'upgradeToAndCall' }
    : UseContractWriteConfig<typeof maidsPredictionABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsPredictionABI, 'upgradeToAndCall', TMode>({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsPredictionABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"claimReward"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionClaimReward(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'claimReward'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'claimReward',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'claimReward'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"createPrediction"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionCreatePrediction(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'createPrediction'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'createPrediction',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'createPrediction'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"predict"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionPredict(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'predict'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'predict',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'predict'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setChoicesLength"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionSetChoicesLength(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setChoicesLength'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setChoicesLength',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setChoicesLength'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setEndTime"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionSetEndTime(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setEndTime'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setEndTime',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setEndTime'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setPredictionURI"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionSetPredictionUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setPredictionURI'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setPredictionURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setPredictionURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setRate"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionSetRate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setRate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setRate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setRate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"setToken"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionSetToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setToken'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'setToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'setToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"settle"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionSettle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'settle'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'settle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'settle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'upgradeTo'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'upgradeTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsPredictionABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function usePrepareMaidsPredictionUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsPredictionABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof maidsPredictionABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"AdminChanged"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionAdminChangedEvent(
  config: Omit<UseContractEventConfig<typeof maidsPredictionABI, 'AdminChanged'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"BeaconUpgraded"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionBeaconUpgradedEvent(
  config: Omit<UseContractEventConfig<typeof maidsPredictionABI, 'BeaconUpgraded'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionInitializedEvent(
  config: Omit<UseContractEventConfig<typeof maidsPredictionABI, 'Initialized'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof maidsPredictionABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"PredictionCreated"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionPredictionCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof maidsPredictionABI, 'PredictionCreated'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof maidsPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'PredictionCreated',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'PredictionCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"Settle"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionSettleEvent(
  config: Omit<UseContractEventConfig<typeof maidsPredictionABI, 'Settle'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'Settle',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'Settle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsPredictionABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x478fF14966Fe50645EDc6D1ACa2a5193801d6944)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A)
 */
export function useMaidsPredictionUpgradedEvent(
  config: Omit<UseContractEventConfig<typeof maidsPredictionABI, 'Upgraded'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsPredictionABI,
    address: maidsPredictionAddress[chainId as keyof typeof maidsPredictionAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof maidsPredictionABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof maidsTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof maidsTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof maidsTokenABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, TFunctionName, TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"addOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenAddOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'addOperator'>['request']['abi'],
        'addOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'addOperator' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'addOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'addOperator', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'addOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"airdrop"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenAirdrop<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'airdrop'>['request']['abi'],
        'airdrop',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'airdrop' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'airdrop', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'airdrop'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'airdrop', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'airdrop',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'approve', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'decreaseAllowance'>['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'decreaseAllowance', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'increaseAllowance'>['request']['abi'],
        'increaseAllowance',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'increaseAllowance', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'mint', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"removeOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenRemoveOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'removeOperator'>['request']['abi'],
        'removeOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'removeOperator' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'removeOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removeOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'removeOperator', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'removeOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'renounceOwnership', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'transfer', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'transferFrom', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsTokenABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof maidsTokenABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsTokenABI, 'transferOwnership', TMode>({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsTokenABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"addOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenAddOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'addOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'addOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'addOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"airdrop"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenAirdrop(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsTokenABI, 'airdrop'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'airdrop',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'airdrop'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsTokenABI, 'approve'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenMint(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsTokenABI, 'mint'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"removeOperator"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenRemoveOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'removeOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'removeOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'removeOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsTokenABI, 'transfer'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsTokenABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function usePrepareMaidsTokenTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsTokenABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsTokenABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsTokenABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof maidsTokenABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    ...config,
  } as UseContractEventConfig<typeof maidsTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsTokenABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenApprovalEvent(
  config: Omit<UseContractEventConfig<typeof maidsTokenABI, 'Approval'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof maidsTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsTokenABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof maidsTokenABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof maidsTokenAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof maidsTokenABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsTokenABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6)
 */
export function useMaidsTokenTransferEvent(
  config: Omit<UseContractEventConfig<typeof maidsTokenABI, 'Transfer'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof maidsTokenAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsTokenABI,
    address: maidsTokenAddress[chainId as keyof typeof maidsTokenAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof maidsTokenABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsVotingAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"getAllVotes"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingGetAllVotes<
  TFunctionName extends 'getAllVotes',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'getAllVotes',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"getVoteAmountsOfToken"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingGetVoteAmountsOfToken<
  TFunctionName extends 'getVoteAmountsOfToken',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'getVoteAmountsOfToken',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"getVoteAmountsOfUser"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingGetVoteAmountsOfUser<
  TFunctionName extends 'getVoteAmountsOfUser',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'getVoteAmountsOfUser',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"getVotedAddress"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingGetVotedAddress<
  TFunctionName extends 'getVotedAddress',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'getVotedAddress',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"getVotedAddressOfToken"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingGetVotedAddressOfToken<
  TFunctionName extends 'getVotedAddressOfToken',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'getVotedAddressOfToken',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"token"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof maidsVotingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof maidsVotingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsVotingABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsVotingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsVotingABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof maidsVotingABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsVotingABI, TFunctionName, TMode>({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsVotingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsVotingABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof maidsVotingABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsVotingABI, 'renounceOwnership', TMode>({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"setEndTime"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingSetEndTime<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsVotingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsVotingABI, 'setEndTime'>['request']['abi'],
        'setEndTime',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setEndTime' }
    : UseContractWriteConfig<typeof maidsVotingABI, 'setEndTime', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setEndTime'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsVotingABI, 'setEndTime', TMode>({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'setEndTime',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsVotingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsVotingABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof maidsVotingABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsVotingABI, 'transferOwnership', TMode>({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"vote"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingVote<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof maidsVotingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof maidsVotingABI, 'vote'>['request']['abi'],
        'vote',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'vote' }
    : UseContractWriteConfig<typeof maidsVotingABI, 'vote', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'vote'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof maidsVotingABI, 'vote', TMode>({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'vote',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsVotingABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function usePrepareMaidsVotingWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsVotingABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsVotingAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsVotingABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function usePrepareMaidsVotingRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsVotingABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsVotingABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"setEndTime"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function usePrepareMaidsVotingSetEndTime(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsVotingABI, 'setEndTime'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'setEndTime',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsVotingABI, 'setEndTime'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function usePrepareMaidsVotingTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof maidsVotingABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsVotingABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link maidsVotingABI}__ and `functionName` set to `"vote"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function usePrepareMaidsVotingVote(
  config: Omit<UsePrepareContractWriteConfig<typeof maidsVotingABI, 'vote'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof maidsVotingAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    functionName: 'vote',
    ...config,
  } as UsePrepareContractWriteConfig<typeof maidsVotingABI, 'vote'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsVotingABI}__.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof maidsVotingABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof maidsVotingAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    ...config,
  } as UseContractEventConfig<typeof maidsVotingABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link maidsVotingABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x936756a41B244EF81712F95fE347278d42A51C05)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE)
 */
export function useMaidsVotingOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof maidsVotingABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof maidsVotingAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: maidsVotingABI,
    address: maidsVotingAddress[chainId as keyof typeof maidsVotingAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof maidsVotingABI, 'OwnershipTransferred'>)
}
