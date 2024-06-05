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
      name: 'MaidsLotteryOld',
      abi: MaidsLottery.abi as Abi,
      address: {
        [polygon.id]: '0xa15383DE388101fA5071c51b3f6505696862c635',
        [sepolia.id]: '0x44b9473bD8B06FaE1B0396c2f9b31fBA32039D43',
      },
    },
    {
      name: 'MaidsLottery',
      abi: MaidsLottery.abi as Abi,
      address: {
        [polygon.id]: '0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58',
        [sepolia.id]: '0x0d95B0D591448a3fe988d3EF975ACC9eCa009A26',
      },
    },
    {
      name: 'MedalNFT',
      abi: ERC1155Mock.abi as Abi,
      address: {
        [polygon.id]: '0x14c85a7307167253348319113cB5Fad6647fF1a8',
        [sepolia.id]: '0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2',
      },
    },
    {
      name: 'TicketNFT',
      abi: ERC1155Mock.abi as Abi,
      address: {
        [polygon.id]: '0x74a8a863545cdf0806a12E14Eb48b728453Bf343',
        [sepolia.id]: '0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E',
      },
    },
  ],
  plugins: [react()],
})
