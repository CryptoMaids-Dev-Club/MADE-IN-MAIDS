const ethers = require("ethers");
const MedalContract = require("../out/MaidsMedal.sol/MaidsMedal.json");
const MEDAL_CONTRACT_ADDRESS = "0x14c85a7307167253348319113cB5Fad6647fF1a8";
require("dotenv").config();

const Airdrop = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.POLYGON_RPC_URL
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    MEDAL_CONTRACT_ADDRESS,
    MedalContract.abi,
    provider
  );
  const contractWithSigner = contract.connect(signer);

  const to = [
    "0xb9De2BFca81C60c013CE33CfF687a7050E0e9348", // Yuki
    "0x0F8B860e765143C9A661392E533C65612C238e06", // Akane
    "0xF15f58195A4F646C66363eA8bFc30BbBa450DE1A", // Koen
    "0xde38c6964f840afeeb6d891cb4f6b132498579ae", // Kabepon
    "0x1a78Ce6Ad347e4ae2DfC03FAfF6981a2E82a4200", // Okawa
    "0x3d42F40b1F128bB3C42E87C58eaf3992Abb03CA3", // imi
    // "0xe78ab91f0e7fd82d35e5e250da2924363f205233", // Luis
    // "0x7B2E28b32894522ADd2844805d744b07B8392edD", // Sarry
    // "0x2666eCbEFA9837C25E3541beFec8F9D40dECB31b", // Koyamaneko
    // "0x3c753055007AF12cC7434f0d5FF20b9cA0d83cdd", // napori
    // "0x20519E6e6864cB74822d102FF60FA7fF98520159", // sabuichi
    // "0xa94a4c59fC51010D6994041e923032b63f7FD5aD", // Takashi
  ];
  const amount = [1, 1, 1, 1, 1, 1];
  const itemId = [0, 0, 0, 0, 0, 0];

  const gasPrice = await provider.getGasPrice();

  const tx = await contractWithSigner.airdrop(to, itemId, amount, {
    gasLimit: 8000000,
    gasPrice: gasPrice,
  });
  console.log(tx);
  await tx.wait();
  console.log("Transaction completed!");
};

Airdrop();
