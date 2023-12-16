const hre = require("hardhat");

describe("MaidsMarketPlace contract", function () {
  let ownner;
  let bob;

  let yield;
  let token;

  beforeEach(async function () {
    [owner, bob] = await hre.ethers.getSigners();

    const TokenContarct = await hre.ethers.getContractFactory("MaidsToken");
    token = await TokenContarct.deploy();
    await token.deployed();

    const NFTContract = await hre.ethers.getContractFactory(
      "CryptoMaidsERC721A"
    );
    const nft = await NFTContract.deploy();
    await nft.deployed();

    const YieldContract = await hre.ethers.getContractFactory(
      "MaidsTokenYield"
    );
    yield = await YieldContract.deploy(token.address, nft.address);
    await yield.deployed();

    await token.connect(owner).addOperator(yield.address);
    await nft.connect(bob).mint(bob.address, 10);
  });

  describe("Basic Checks", function () {
    it("Claim", async function () {
      const tokenIds = await yield.walletOfOwner(bob.address);
      await yield.connect(bob).claim(tokenIds);
    });
  });
});
