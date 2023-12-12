const hre = require("hardhat");

async function main() {
  // MaidsToken.sol
  // const MaidsToken = await hre.ethers.getContractFactory("MaidsToken");
  // const maidsToken = await MaidsToken.deploy();
  // await maidsToken.deployed();
  // console.log(`Maids Token:  ${maidsToken.address}`);

  // CryptoMaidsERC721A.sol
  // const CryptoMaidsERC721A = await hre.ethers.getContractFactory(
  //   "CryptoMaidsERC721A"
  // );
  // const cryptoMaidsERC721A = await CryptoMaidsERC721A.deploy();
  // await cryptoMaidsERC721A.deployed();
  // console.log(`CryptoMaidsERC721A: ${cryptoMaidsERC721A.address}`);

  // MaidsTokenYield.sol
  const MaidsTokenYield = await hre.ethers.getContractFactory(
    "MaidsTokenYield"
  );
  const maidsTokenYield = await MaidsTokenYield.deploy(
    "0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF",
    "0x76ad4b5082d4e76c68cfed450b2a95a4f9de396a" // Relayer account
  );
  await maidsTokenYield.deployed();
  console.log(`MaidsTokenYield:  ${maidsTokenYield.address}`);

  await maidsToken.addOperator(maidsTokenYield.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Maids Token:  0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF
// MaidsTokenYield:  0x9803445DA8701F6cbc9AE0dD24928961847bdAc2
