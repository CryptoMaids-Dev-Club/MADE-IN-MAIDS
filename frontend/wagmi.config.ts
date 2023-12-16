import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { Abi } from 'viem'
import { polygon, sepolia } from 'wagmi/chains'
import MaidsItem from '../contracts/artifacts/contracts/MaidsItem1155.sol/MaidsItem1155.json'
import MaidsMarket from '../contracts/artifacts/contracts/MaidsMarketPlace.sol/MaidsMarketPlace.json'
import MaidsPrediction from '../contracts/artifacts/contracts/MaidsPrediction.sol/MaidsPrediction.json'
import MaidsToken from '../contracts/artifacts/contracts/MaidsToken.sol/MaidsToken.json'
import MaidsVoting from '../contracts/artifacts/contracts/MaidsVoting.sol/MaidsVoting.json'

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
        [sepolia.id]: '0xB85Be6e3c82c633D1771F4c51a4F4A6CeA4A0871',
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
  ],
  plugins: [react()],
})
