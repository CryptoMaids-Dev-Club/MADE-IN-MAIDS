const ethers = require('ethers')
const LotteryContract = require('../out/MaidsLottery.sol/MaidsLottery.json')
const Lottery_CONTRACT_ADDRESS = '0x170aD3a28ecFa2A9902f5f6F046CBc6C7BC3aF58'
require('dotenv').config()

const UpdatePrizeInfo = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const contract = new ethers.Contract(Lottery_CONTRACT_ADDRESS, LotteryContract.abi, provider)
  const contractWithSigner = contract.connect(signer)

  const prizeInfo = [
    {
      prizeName: 'YUKI YUKI KIZUNA',
      prizeImageUrl: 'https://made-in-maids.s3.us-east-1.amazonaws.com/lottery/202502/YukiKizuna.png',
    },
    {
      prizeName: 'Ohayo chan',
      prizeImageUrl: 'https://made-in-maids.s3.us-east-1.amazonaws.com/lottery/202502/ohayo02.png',
    },
    {
      prizeName: '10 USDC',
      prizeImageUrl: 'https://made-in-maids.s3.us-east-1.amazonaws.com/lottery/202502/usdc.png',
    },
    // {
    // 	prizeName: "Pokemon Card",
    // 	prizeImageUrl:
    // 		"https://made-in-maids.s3.amazonaws.com/lottery/Oct/secret.png",
    // },
  ]

  const gasPrice = await provider.getGasPrice()

  const tx = await contractWithSigner.updatePrizeInfo(6, prizeInfo, {
    gasLimit: 8000000,
    gasPrice: gasPrice,
  })
  console.log(tx)
  await tx.wait()
  console.log('Transaction completed!')
}

UpdatePrizeInfo()
