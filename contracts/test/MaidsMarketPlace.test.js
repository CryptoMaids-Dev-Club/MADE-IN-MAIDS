const hre = require("hardhat");

describe("MaidsMarketPlace contract", function () {
  let ownner;
  let bob;

  let contractProxy;
  let token;

  beforeEach(async function () {
    [owner, bob] = await hre.ethers.getSigners();

    const TokenContarct = await hre.ethers.getContractFactory("MaidsToken");
    token = await TokenContarct.deploy();
    await token.deployed();
    await token.connect(owner).addOperator(owner.address);
    await token.connect(owner).mint(bob.address, 10000);

    const NFTContract = await hre.ethers.getContractFactory("MaidsItem1155");
    const nft = await NFTContract.deploy("");
    await nft.deployed();

    const Contract = await hre.ethers.getContractFactory("MaidsMarketPlace");
    const contract = await Contract.deploy();
    await contract.deployed();

    const Proxy = await hre.ethers.getContractFactory("UUPSProxy");
    const data = Contract.interface.encodeFunctionData("initialize", [
      token.address,
      nft.address,
    ]);
    const proxy = await Proxy.deploy(contract.address, data);
    await proxy.deployed();

    contractProxy = await hre.ethers.getContractAt(
      "MaidsMarketPlace",
      proxy.address
    );

    await contractProxy.connect(owner).addOperator(owner.address);
    await token.connect(owner).addOperator(contractProxy.address);
    await nft.connect(owner).addOperator(contractProxy.address);
  });

  describe("Basic Checks", function () {
    it("CreateMarketItem", async function () {
      const marketItem = {
        price: 1000,
        supply: 100,
        tokenURI: "https://hogehoge.com",
        startTime: 100000,
        limitPerWallet: 3,
      };
      await contractProxy.connect(owner).createMarketItem(marketItem);
      const items = await contractProxy.fetchMarketItems();
      console.log(items);
    });

    it("BuyItem", async function () {
      await token.connect(bob).approve(contractProxy.address, 10000);
      await contractProxy
        .connect(owner)
        .createMarketItem(1000, 100, "https://hogehoge.com");
      await contractProxy.connect(bob).buyItem(0, 1);
    });
  });
});
