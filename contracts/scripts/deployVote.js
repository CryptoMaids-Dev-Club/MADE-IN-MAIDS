const hre = require("hardhat");

async function main() {
  // MaidsToken.sol
  //   const MaidsToken = await hre.ethers.getContractFactory("MaidsToken");
  //   const maidsToken = await MaidsToken.deploy();
  //   await maidsToken.deployed();
  //   console.log(`Maids Token:  ${maidsToken.address}`);

  // MaidsVoting.sol
  const MaidsVoting = await hre.ethers.getContractFactory("MaidsVoting");
  const maidsVoting = await MaidsVoting.deploy(
    "0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF"
  );
  await maidsVoting.deployed();
  console.log(`MaidsVoting:  ${maidsVoting.address}`);

  //   await maidsToken.addOperator(maidsVoting.address);
  //   await maidsToken.addOperator("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
