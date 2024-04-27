import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { Abi } from 'viem'
import { polygon, sepolia } from 'wagmi/chains'
import ERC1155Mock from '../contracts/out/ERC1155Mock.sol/ERC1155Mock.json'
import MaidsItem from '../contracts/out/MaidsItem1155.sol/MaidsItem1155.json'
import MaidsLottery from '../contracts/out/MaidsLottery.sol/MaidsLottery.json'
import MaidsMarket from '../contracts/out/MaidsMarketPlace.sol/MaidsMarketPlace.json'
import MaidsPrediction from '../contracts/out/MaidsPrediction.sol/MaidsPrediction.json'
import MaidsToken from '../contracts/out/MaidsToken.sol/MaidsToken.json'
import MaidsVoting from '../contracts/out/MaidsVoting.sol/MaidsVoting.json'

export default defineConfig({
  out: 'src/lib/generated.ts',
  contracts: [
    {
      name: 'MaidsToken',
      abi: MaidsToken.abi as Abi,
      address: {
        [polygon.id]: '0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF',
        [sepolia.id]: '0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6',
      },
    },
    {
      name: 'MaidsMarket',
      abi: MaidsMarket.abi as Abi,
      address: {
        [polygon.id]: '0x937E61302C5565Bdd488DF35Fb7d362a323037f7',
        [sepolia.id]: '0xA61c6ce07bd1D1Ab98CA005896a1C6dee34B1955',
      },
    },
    {
      name: 'MaidsItem',
      abi: MaidsItem.abi as Abi,
      address: {
        [polygon.id]: '0x74a8a863545cdf0806a12E14Eb48b728453Bf343',
        [sepolia.id]: '0x44C90619A015EF1B679D638ECa693b10fB28DC83',
      },
    },
    {
      name: 'MaidsPrediction',
      abi: MaidsPrediction.abi as Abi,
      address: {
        [polygon.id]: '0x478fF14966Fe50645EDc6D1ACa2a5193801d6944',
        [sepolia.id]: '0x11828753AA5C7E93F705b2dC11F9eA4DBC767A8A',
      },
    },
    {
      name: 'MaidsVoting',
      abi: MaidsVoting.abi as Abi,
      address: {
        [polygon.id]: '0x936756a41B244EF81712F95fE347278d42A51C05',
        [sepolia.id]: '0x0798f26b60b7eB6a536B7ADA941Fb2f400bFB0eE',
      },
    },
    {
      name: 'MaidsLottery',
      abi: MaidsLottery.abi as Abi,
      address: {
        [polygon.id]: '0x225295ac7b0f4CB2f6BA4AAd8f8eBB287d2c56ea',
        [sepolia.id]: '0x341d61664F5D6789Eb2Ba8E15A2E84B44a41caDE',
      },
    },
    {
      name: 'MedalNFT',
      abi: ERC1155Mock.abi as Abi,
      address: {
        [polygon.id]: '0x1E42B1A4B2389318E9cBC79801c9B72AEfF8786c',
        [sepolia.id]: '0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2',
      },
    },
    {
      name: 'TicketNFT',
      abi: ERC1155Mock.abi as Abi,
      address: {
        [polygon.id]: '0xcF4b3f5Af27777075f4e4422e529a11E147296dC',
        [sepolia.id]: '0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E',
      },
    },
  ],
  plugins: [react()],
})
