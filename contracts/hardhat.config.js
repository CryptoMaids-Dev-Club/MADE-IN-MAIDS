require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 300,
      },
    },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_KEY,
      polygon: process.env.POLYGONSCAN_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "JPY",
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.COINMARKETCAP_KEY,
  },
};
