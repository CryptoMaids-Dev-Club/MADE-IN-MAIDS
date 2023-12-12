const hre = require("hardhat");

async function main() {
  // MaidsToken.sol
  // const MaidsToken = await hre.ethers.getContractFactory("MaidsToken");
  // const maidsToken = await MaidsToken.deploy();
  // await maidsToken.deployed();
  // console.log(`Maids Token:  ${maidsToken.address}`);

  // CryptoMaidsItem1155.sol
  const CryptoMaidsItem1155 = await hre.ethers.getContractFactory(
    "MaidsItem1155"
  );
  const cryptoMaidsItem1155 = await CryptoMaidsItem1155.deploy("");
  await cryptoMaidsItem1155.deployed();
  console.log(`CryptoMaidsItem1155: ${cryptoMaidsItem1155.address}`);

  // MaidsMarketPlace.sol
  const MaidsMarket = await hre.ethers.getContractFactory("MaidsMarketPlace");
  const maidsMarket = await MaidsMarket.deploy();
  await maidsMarket.deployed();
  console.log(`MaidsMarketPlace: ${maidsMarket.address}`);

  const Proxy = await hre.ethers.getContractFactory("UUPSProxy");
  const data = MaidsMarket.interface.encodeFunctionData("initialize", [
    // maidsToken.address,
    "0x2f6Bbc927e68d70937881B2CF19fFA2a5EB3E44a",
    cryptoMaidsItem1155.address,
  ]);

  const proxy = await Proxy.deploy(maidsMarket.address, data);
  await proxy.deployed();
  console.log(`Proxy: ${proxy.address}`);

  const wrappedProxy = await ethers.getContractAt(
    "MaidsMarketPlace",
    proxy.address
  );

  // await maidsToken.addOperator(proxy.address);
  await cryptoMaidsItem1155.addOperator(proxy.address);
  // await maidsToken.addOperator("0x23CA0c2219de2C5A6bf13B66897303c2766f3DE5"); // admin address
  await wrappedProxy.addOperator("0x2Fe949EbBd42CbBa1a5048c865140345DcC2141b"); // admin address
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
